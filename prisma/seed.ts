import { PrismaClient } from "@prisma/client";
import { generateAuthToken } from '../src/lib/utils/helper';
const prisma = new PrismaClient();

export const seedUSMSSaffron = async () => {
    const usmssaffron = await prisma.customer.findFirst({
        where: {
            fName: "usmssaffron",
        },
    });

    if (!usmssaffron) {
        await prisma.customer.create({
            data: {
                fName: "usmssaffron",
                lName: "usmssaffron",
                email: "usmssaffron",
                emailValidated: true,
                active: true,
            },
        });
        console.log("usmssaffron customer created");
    }

    let usmssaffronOrg = await prisma.organization.findFirst({
        where: {
            customerId: usmssaffron?.id,
        },
    });

    if (!usmssaffronOrg) {
        usmssaffronOrg = await prisma.organization.create({
            data: {
                customerId: usmssaffron?.id,
            },
        });
        console.log("usmssaffron organization created");
    }

    const usmssaffronAccount = await prisma.account.findFirst({
        where: {
            organizationId: usmssaffronOrg?.id,
        },
    });

    if (!usmssaffronAccount && usmssaffronOrg) {
        const authToken = generateAuthToken();
        await prisma.account.create({
            data: {
                organizationId: usmssaffronOrg?.id,
                authPrimaryToken: authToken,
            },
        });
        console.log("usmssaffron account created");
    }
}

const main = async () => {
    console.log(`Start seeding ...`);
    await seedUSMSSaffron();
    console.log(`Seeding finished.`);
};

main()
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect()
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
