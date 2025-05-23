/* --------------------------------------------------------------------------------------------------------------

    Last edited: 

        Miguel Armand B. Sta. Ana [May 9, 2025]

    Company: github.com/codekada
    Project: github.com/jkbicierro/expo-billang

    <Ticket Info>
    
    Feature Title: Sovereign Saver Badge Screen
    Description: This is the Sovereign Saver Badge Screen

-------------------------------------------------------------------------------------------------------------- */
import React from "react";
import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import SovereignSaverSVG from "../../assets/bigbadges/big_sovereign_saver.svg";
import Exit from "../../assets/bigbadges/exit.svg";
import Trophy from "../../assets/bigbadges/trophy.svg";
import Continue from "../../assets/bigbadges/continue.svg";
import { useNavigation } from "@react-navigation/native";

// Define props type for clarity and type safety
type SovereignSaverProps = {
    onExit?: () => void;
};

const SovereignSaver: React.FC<SovereignSaverProps> = ({ onExit }) => {
    const navigation = useNavigation();
    const handleExit = onExit || (() => navigation.goBack());

    return (
        <>
            <StatusBar
                translucent
                backgroundColor="transparent"
                barStyle="light-content"
            />
            <View style={{ flex: 1, position: "relative" }}>
                {/* Exit icon at top right */}
                <TouchableOpacity style={styles.exitIcon} onPress={handleExit}>
                    <Exit width={28} height={28} />
                </TouchableOpacity>
                <LinearGradient
                    colors={["#E975A5", "#FBFBFB"]}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 1 }}
                    style={styles.container}
                >
                    <Trophy />
                    <Text style={styles.incomplete}>Incomplete</Text>
                    <SovereignSaverSVG />
                    <Text style={styles.title}>Sovereign Saver</Text>
                    <Text style={styles.subtitle}>
                        You have saved money for the first time!
                    </Text>
                </LinearGradient>
                {/* Bottom action buttons */}
                <View style={styles.bottomButtons}>
                    <TouchableOpacity onPress={handleExit}>
                        <Continue />
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 80,
    },
    incomplete: {
        fontFamily: "Lexend_400Regular",
        fontSize: 16,
        color: "#fff",
        marginTop: 10,
        marginBottom: 18,
        textAlign: "center",
    },
    title: {
        fontFamily: "Lexend_600SemiBold",
        fontSize: 24,
        color: "#fff",
        marginTop: 15,
        marginBottom: 19,
    },
    subtitle: {
        fontFamily: "Lexend_400Regular",
        fontSize: 16,
        color: "#fff",
        textAlign: "center",
    },
    exitIcon: {
        position: "absolute",
        top: 55,
        right: 30,
        zIndex: 10,
    },
    bottomButtons: {
        position: "absolute",
        bottom: 40,
        left: 2,
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        justifyContent: "flex-end",
        paddingRight: 84,
    },
});

export default SovereignSaver;
