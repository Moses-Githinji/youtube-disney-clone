import styled from "styled-components";
import ImgSlider from "./ImgSlider";
import Viewers from "./Viewers";
import Recommends from "./Recommends";
import NewDisney from "./NewDisney";
import Originals from "./Originals";
import Trendings from "./Trendings";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import db from "../firebase";
import { setMovies } from "../features/movie/movieSlice";
import { selectUserName } from "../features/user/userSlice";

const Home = (props) => {

    const dispatch = useDispatch();
    const userName = useSelector(selectUserName);

    let recommends = useRef([]);
    let newDisneys = useRef([]);
    let originals = useRef([]);
    let trending = useRef([]);

        useEffect(() => {
            db.collection("movies").onSnapshot((snapshot) => {
            snapshot.docs.forEach((doc) => {

                switch (doc.data().type) {
                    case "recommend":
                        recommends.current.push({ id: doc.id, ...doc.data() });
                        break;

                    case "new":
                        newDisneys.current.push({ id: doc.id, ...doc.data() });
                        break;

                    case "original":
                        originals.current.push({ id: doc.id, ...doc.data() });
                        break;

                    case "trending":
                        trending.current.push({ id: doc.id, ...doc.data() });
                        break;
                    default:
                        console.log("Nothing there!!");
                    
                }

            });

                dispatch(
                    setMovies({
                        recommend: recommends,
                        newDisney: newDisneys,
                        original: originals,
                        trending: trending,
                    })
                );
            });
    }, [userName, dispatch]);

    return(
        <Container>
            <ImgSlider />
            <Viewers />
            <Recommends />
            <NewDisney />
            <Originals />
            <Trendings />
        </Container>
    )
}


const Container = styled.main`
    position: relative;
    min-height: calc(100vh - 250px);
    overflow: hidden;
    display: block;
    top: 72px;
    padding: 0 calc(3.5vw + 5px);

    &:after {
        background: url("/images/home-background.png") center center / cover no-repeat fixed;
        content: "";
        position: absolute;
        inset: 0px;
        opacity: 1;
        z-index: -1;
    }
`;

export default Home;