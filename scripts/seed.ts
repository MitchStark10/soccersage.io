import { db } from 'api/src/lib/db';

export default async () => {
    try {
        console.log(
            "\nUsing the default './scripts/seed.{js,ts}' template\nEdit the file to add seed data\n"
        );

        await db.prediction.deleteMany();
        await db.game.deleteMany();
        await db.user.deleteMany();
    } catch (error) {
        console.warn('Please define your seed data.');
        console.error(error);
    }
};
