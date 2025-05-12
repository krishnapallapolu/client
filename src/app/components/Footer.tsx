
export default function Footer() {
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    return (
        <footer className='container-3xl max-w-[1320px] mx-auto text-center py-8'>
            <p>Meeting Minds Experts - copyright @ {currentYear}. All rights reserved</p>
        </footer>
    );
};  


