import { useNavigate } from "react-router-dom";

const Plane = () => {

    const navigate = useNavigate();

    function handleClicked() {
        navigate("/")
    }

    return(
        <h1> Hola <span onClick={handleClicked}> Volver </span> </h1>
    )
}

export default Plane;