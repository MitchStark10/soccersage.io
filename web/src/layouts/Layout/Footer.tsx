import { Link, routes } from '@redwoodjs/router';

export const Footer = () => {
    return (
        <footer className="bg-black text-white p-5 w-full flex justify-between items-center">
            &copy; Mitch Stark {new Date().getFullYear()}
            <Link
                to={routes.provideFeedback()}
                className=" font-bold text-white underline"
            >
                Provide Feedback
            </Link>
        </footer>
    );
};
