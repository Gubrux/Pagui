import Navigation from "./Navigation";
function Layout({ Children }) {
    return (
        <>
            <Navigation />
            {Children}
        </>
    );
}

export default Layout;
