import { Text } from "@react-three/drei";

const MyName = () => {

    return(
        <>
            <Text
                position={[-21, 4, 15]}
                rotation={[0,((-47 * Math.PI)/180),0]}
                color="#353535"
                fontSize={1}
            > Luis Linares. </Text>
            <Text
                position={[-21, 5, 15]}
                rotation={[0,((-47 * Math.PI)/180),0]}
                color="#353535"
                fontSize={.8}
            >
                Portafolio.
            </Text>
        </>
    )

}

export default MyName;