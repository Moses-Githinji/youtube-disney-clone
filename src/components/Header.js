import { useEffect } from "react";
import styled from "styled-components";
import { auth, provider } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { selectUserName, selectUserPhoto, setSignOutState, setUserLoginDetails } from "../features/user/userSlice";

const Header = (props) => {

    const dispatch = useDispatch();
    const history = useHistory();
    const userName = useSelector(selectUserName);
    const userPhoto = useSelector(selectUserPhoto);

    useEffect(() => {
        auth.onAuthStateChanged(async user => {
            if(user) {
                setUser(user);
                history.push("/home");
            }
        });
    }, [userName, history]);


    const handleAuth = () => {

        if(!userName) {
            signInWithPopup(getAuth(), provider)
            .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);

                setUser(result.user);

            //const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // ...
            }).catch((error) => {
                alert(error.message);
                // Handle Errors here.
                //const errorCode = error.code;
                //const errorMessage = error.message;
                // The email of the user's account used.
                //const email = error.email;
                // The AuthCredential type that was used.
                //const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            }) 
        } else if(userName) {
            auth.signOut().then(() => {
                dispatch(setSignOutState());
                history.push("/");
            }).catch((err) => alert(err.message))
        }

        
    };

    const setUser = (user) => {
        dispatch(
            setUserLoginDetails({
                name: user.displayName,
                email: user.emai,
                photo: user.photoURL,
            })
        );
    }

    

    return <Nav>
        <Logo>
            <img src="/images/logo.svg" alt="Disney+" />
        </Logo>

        {!userName ? 
            <LogIn onClick={handleAuth}>Login</LogIn> 
            :

            <>
                <NavMenu>
                    <a href="/home">
                        <img src="/images/home-icon.svg" alt="Home" />
                        <span>HOME</span>
                    </a>
                    <a href="/search">
                        <img src="/images/search-icon.svg" alt="Home" />
                        <span>SEARCH</span>
                    </a>
                    <a href="/watchlist">
                        <img src="/images/watchlist-icon.svg" alt="Home" />
                        <span>WATCHLIST</span>
                    </a>
                    <a href="/originals">
                        <img src="/images/original-icon.svg" alt="Home" />
                        <span>ORIGINALS</span>
                    </a>
                    <a href="/movies">
                        <img src="/images/movie-icon.svg" alt="Home" />
                        <span>MOVIES</span>
                    </a>
                    <a href="/series">
                        <img src="/images/series-icon.svg" alt="Home" />
                        <span>SERIES</span>
                    </a>
                </NavMenu>
                <SignOut>
                    <UserImg src={userPhoto} alt={userName} />
                    <DropDown>
                        <span onClick={handleAuth}>Sign out</span>
                    </DropDown>
                </SignOut>
            </>
        }
    </Nav>
}

const Nav = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 70px;
    background-color: #090b13;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 36px;
    letter-spacing: 16px;
    z-index: 3;
`;

const Logo = styled.a`
    padding: 0;
    width: 80px;
    margin-top: 4px;
    max-height: 70px;
    font-size: 0;
    display: inline-block;

    img {
        display: block;
        width: 100%;
    }
`;

const NavMenu = styled.div`
    align-items: center;
    display: flex;
    flex-flow: row nowrap;
    height: 100%;
    justify-content: flex-end;
    padding: 0;
    margin: 0;
    position: relative;
    margin-right: auto;
    margin-left: 25px;

    a {
        display: flex;
        align-items: center;
        padding: 0 12px;

        img {
        height: 20px;
        min-width: 20px;
        width: 20px;
        z-index: auto;
        }

        span {
            color: rgb(249, 249, 249);
            margin-left: 5px;
            font-size: 13px;
            letter-spacing: 1.5px;
            line-height: 1.3;
            padding: 2px 0;
            white-space: nowrap;
            position: relative;

            &:before {
                background-color: rgb(249, 249, 249);
                border-radius: 0px 0px 4px 4px;
                bottom: -6px;
                content: "";
                height: 2px;
                left: 0;
                opacity: 0;
                position: absolute;
                right: 0;
                transform-origin: left center;
                transform: scaleX(0);
                transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
                visibility: hidden;
                width: auto;
            }
        }

    &:hover {
        span:before {
            transform: scaleX(1);
            visibility: visible;
            opacity: 1 !important;
        }
    }
}

    @media (max-width: 768px) {
        display: none;
    }
`;

const LogIn = styled.a`
    background-color: rgba(0, 0, 0, 0.6);
    padding: 8px 16px;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    border: 1px solid #f9f9f9;
    border-radius: 4px;
    transition: all 0.2s ease 0s;

    &:hover {
        color: #090b13;
        background-color: #f9f9f9;
        cursor: pointer;
        border-color: transparent;
    }
`;

const UserImg = styled.img`
    height: 100%;
`;

const DropDown = styled.div`
    position: absolute;
    top: 55px;
    right: 3;
    background: rgb(19, 19, 19);
    border: 1px solid rgba(151, 151, 151, 0.34);
    border-radius: 4px;
    box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
    padding: 10px;
    font-size: 12px;
    letter-spacing: 3px;
    width: 100px;
    text-align: center;
    opacity: 0;
`;

const SignOut = styled.div`
    position: relative;
    height: 48px;
    width: 48px;
    display: flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;

    ${UserImg} {
        border-radius: 50%;
        width: 100%;
        height: 100%;
    }

    &:hover {
        ${DropDown} {
            opacity: 1;
            transition-duration: 1s;
        }
    }
`;

export default Header;