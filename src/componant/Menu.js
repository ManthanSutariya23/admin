import { Link } from "react-router-dom";

// import '../assets/sidebarmenu';

function Menu() {
    function logOut() {
        localStorage.removeItem('token');
        window.location.href = '/';
    }
    return (
        <>
            <header className="topbar" data-navbarbg="skin5">
                <nav className="navbar top-navbar navbar-expand-md navbar-dark">
                    <div className="navbar-header" data-logobg="skin5">
                        <Link to={'/dashboard'}>
                            <span className="logo-text ms-2">
                                <img src="../assets/images/logo-text.png" alt="homepage" className="light-logo" />
                            </span>
                        </Link>
                        <a className="nav-toggler waves-effect waves-light d-block d-md-none" href="javascript:void(0)"><i className="ti-menu ti-close" /></a>
                    </div>
                    <div className="navbar-collapse collapse" id="navbarSupportedContent" data-navbarbg="skin5">
                        <ul className="navbar-nav float-start me-auto">
                            <li className="nav-item d-none d-lg-block">
                                <a className="nav-link sidebartoggler waves-effect waves-light" href="javascript:void(0)" data-sidebartype="mini-sidebar"><i className="mdi mdi-menu font-24" /></a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
            <aside className="left-sidebar" data-sidebarbg="skin5">
                <div className="scroll-sidebar">
                    <nav className="sidebar-nav">
                        <ul id="sidebarnav" className="pt-4">

                            <li className="sidebar-item">
                                <Link to={'/dashboard'}>
                                    <span className="sidebar-link waves-effect waves-dark sidebar-link" aria-expanded="false"><i className="mdi mdi-view-dashboard" /><span className="hide-menu">Dashboard</span></span>
                                </Link>
                            </li>

                            <li className="sidebar-item">
                                <Link to={'/manageballot'}>
                                    <span className="sidebar-link"><i className="mdi mdi-tooltip-text" /><span className="hide-menu"> Manage Ballot </span></span>
                                </Link>
                                <Link to={'/addballot'}>
                                    <span className="sidebar-link"><i className="mdi mdi-note-plus" /><span className="hide-menu"> Add Ballot </span></span>
                                </Link>
                                <Link to={'/addcandidate'}>
                                    <span className="sidebar-link"><i className="mdi mdi-account-multiple-plus" /><span className="hide-menu"> Add Candidate </span></span>
                                </Link>
                            </li>

                            <li className="sidebar-item">
                                <Link to={'/managevoter'}>
                                    <span className="sidebar-link"><i className="mdi mdi-account-switch" /><span className="hide-menu"> Manage Voter </span></span>
                                </Link>
                                <Link to={'/addvoter'}>
                                    <span className="sidebar-link"><i className="mdi mdi-account-multiple-plus" /><span className="hide-menu"> Add Voter </span></span>
                                </Link>
                            </li>

                            <li className="sidebar-item">
                                <Link to={'/result'}>
                                    <span className="sidebar-link waves-effect waves-dark sidebar-link" aria-expanded="false"><i className="me-2 mdi mdi-certificate" /><span className="hide-menu">Result</span></span>
                                </Link>
                            </li>

                            <li className="sidebar-item">
                                <Link to={'/setting'}>
                                    <span className="sidebar-link waves-effect waves-dark sidebar-link" aria-expanded="false"><i className="me-2 mdi mdi-settings" /><span className="hide-menu">Setting</span></span>
                                </Link>
                            </li>

                            <li className="sidebar-item">
                                <Link to={'/profile'}>
                                    <span className="sidebar-link waves-effect waves-dark sidebar-link" aria-expanded="false"><i className="fas fa-user" /><span className="hide-menu">Profile</span></span>
                                </Link>
                            </li>

                            <li className="sidebar-item">
                                <span onClick={() => logOut()} className="sidebar-link waves-effect waves-dark sidebar-link" aria-expanded="false"><i className="mdi mdi-logout" /><span className="hide-menu">Log Out</span></span>
                            </li>

                        </ul>
                    </nav>
                </div >
            </aside >
        </>
    );
}

export default Menu;
