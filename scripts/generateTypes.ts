import { PrismaClient } from "@prisma/client";
import { getDMMF } from "@prisma/internals";
import { writeFileSync } from "fs";
import { join } from "path";
import { readFileSync } from "fs";

const prisma = new PrismaClient();

async function generateTypes() {
  // Read the Prisma schema file
  const schemaPath = join(__dirname, "../prisma/schema.prisma"); // Adjust the path as necessary
  const datamodel = readFileSync(schemaPath, "utf-8");

  // Get the DMMF from the Prisma Client
  const dmmf = await getDMMF({ datamodel });

  const types: string[] = [];

  // Generate types for enums
  dmmf.datamodel.enums.forEach((enumDef) => {
    const enumName = enumDef.name;
    const enumValues = enumDef.values.map(value => `  ${value.name} = "${value.name}"`).join(",\n"); // Assign string values
    types.push(`export enum ${enumName} {\n${enumValues}\n}`);
  });

  // Generate types for models
  dmmf.datamodel.models.forEach((model) => {
    const modelName = model.name;
    const fields = model.fields
      .map((field) => {
        const fieldName = field.name;
        let isRequired = field.isRequired; // Check if the field is required
        const isList = field.isList; // Check if the field is a list

        // Determine base type based on field type
        let baseType: string;
        if (field.type === "String") {
          baseType = "string";
        } else if (field.type === "Int" || field.type === "Float" || field.type === "Decimal") {
          baseType = "number";
        } else if (field.type === "Boolean") {
          baseType = "boolean";
        } else if (field.type === "DateTime") {
          baseType = "Date";
        } else if (field.type === "Json") {
          baseType = "object"; // Default for Json, will be overridden below
        } else {
          baseType = field.type; // Handle other types
          isRequired = false; // Set isRequired to false for other types
        }

        // Assign VariantType to variant field
        if (fieldName === "variant") {
          return `  ${fieldName}${isRequired ? "" : "?"}: VariantType;`;
        }

        if (fieldName === "metaInfo") {
          return `  ${fieldName}${isRequired ? "" : "?"}: MetaInfoType;`;
        }

        // Append [] if the field is a list
        const fieldType = isList ? `${baseType}[]` : baseType;

        return `  ${fieldName}${isRequired ? "" : "?"}: ${fieldType};`;
      })
      .join("\n");

    types.push(`export type ${modelName} = {\n${fields}\n};`);
  });

  // Add VariantType definition at the top of the output
  types.push(`export type VariantType = {\n  attributes: {\n    productAttributeId: number;\n    productAttributeValue: number;\n  }[]\n};`);
  types.push(`export type MetaInfoType = {\n  metaKeywords: string;\n  metaDescription: string;\n  metaTitle: string;\n};`);

  const output = types.join("\n\n");

  // Write to a types file
  const outputPath = join(__dirname, "../src/types/models.ts");
  writeFileSync(outputPath, output);
  console.log(`Types generated successfully in ${outputPath}`);
}

generateTypes()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });