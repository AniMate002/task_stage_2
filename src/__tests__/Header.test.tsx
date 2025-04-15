import { fireEvent, screen } from '@testing-library/react';
import { renderWithReduxContextAndRouter } from '../helpers/wrapperTest.helper';
import Header from '../components/organisms/Header/Header';
import AppRouter from '../router/AppRouter';

// await findBy/All - for elements that will appear in async
// getBy/All - if not found will crash the test
// queryBy/All - if not found will return "null"

describe('Header navigation', () => {
    describe('Elements presence', () => {
        test('Header is on the page', () => {
            renderWithReduxContextAndRouter(<Header />);
            const header = screen.queryByRole('banner');
            expect(header).toBeInTheDocument();
        });
        test('Header has navigation', () => {
            renderWithReduxContextAndRouter(<Header />);
            const header = screen.queryByRole('banner');
            expect(header).toBeInTheDocument();

            const nav = screen.queryByRole('navigation');
            expect(nav).toBeInTheDocument();
        });
        test('Header has links', () => {
            renderWithReduxContextAndRouter(<Header />);
            const homeLink = screen.queryByRole('link', { name: /Home/i });
            expect(homeLink).toBeInTheDocument();

            const todoLink = screen.queryByRole('link', { name: /Todo/i });
            expect(todoLink).toBeInTheDocument();

            const usersLink = screen.queryByRole('link', { name: /Users/i });
            expect(usersLink).toBeInTheDocument();

            const productsLink = screen.queryByRole('link', {
                name: /Products/i,
            });
            expect(productsLink).toBeInTheDocument();
        });
    });

    describe('Links logic', () => {
        test('Home link leads to Home', () => {
            renderWithReduxContextAndRouter(<AppRouter />);
            const homeLink = screen.getByRole('link', { name: /Home/i });
            fireEvent.click(homeLink);
            const title = screen.queryByTestId('page_title');
            expect(title).toBeInTheDocument();
            expect(title).toHaveTextContent('Home');
        });
        test('Todo link leads to Todo', () => {
            renderWithReduxContextAndRouter(<AppRouter />);
            const homeLink = screen.getByRole('link', { name: /Todo/i });
            fireEvent.click(homeLink);
            const title = screen.queryByTestId('page_title');
            expect(title).toBeInTheDocument();
            expect(title).toHaveTextContent('Todo');
        });
        test('Users link leads to Users', () => {
            renderWithReduxContextAndRouter(<AppRouter />);
            const homeLink = screen.getByRole('link', { name: /Users/i });
            fireEvent.click(homeLink);
            const title = screen.queryByTestId('page_title');
            expect(title).toBeInTheDocument();
            expect(title).toHaveTextContent('Users');
        });
        test('Products link leads to Products', () => {
            renderWithReduxContextAndRouter(<AppRouter />);
            const homeLink = screen.getByRole('link', { name: /Products/i });
            fireEvent.click(homeLink);
            const title = screen.queryByTestId('page_title');
            expect(title).toBeInTheDocument();
            expect(title).toHaveTextContent('Products');
        });
    });
});
