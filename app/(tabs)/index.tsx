/* --------------------------------------------------------------------------------------------------------------

    Route -> "(tabs)/index.tsx"

    Last edited: 
        Romar Castro [Feb 27, 2025]

    Company: github.com/codekada
    Project: github.com/jkbicierro/expo-billang

    <Ticket Info>
    Feature ID: BL-3
    Feature Title: Home Screen
    Description: Home screen for the app oroviding the user an overview of all the details


    npm run start
    press s (switch to expo go)
    press a (switch to android emulator)
-------------------------------------------------------------------------------------------------------------- */

import {
    Platform,
    Pressable,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";

import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "@/database/drizzle/migrations";
import { user_tb } from "@/database/schema";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";

import React from "react";
import { db } from "@/database";
import { User, Bell, Search, Filter, History } from "lucide-react-native";

export default function HomeScreen() {
    const days = ["S", "M", "T", "W", "Th", "F", "S"];
    const { success, error } = useMigrations(db, migrations);
    const [items, setItems] = useState<(typeof user_tb.$inferSelect)[] | null>(
        null,
    );

    useEffect(() => {
        if (!success) return;

        (async () => {
            await db.delete(user_tb);

            await db.insert(user_tb).values([
                {
                    name: "John",
                    onboarding: false,
                },
            ]);

            const users = await db.select().from(user_tb);
            setItems(users);
            if (users[0].onboarding === false) {
                // router.replace("/onboarding/ob");
            }
        })();
    }, [success]);

    if (error) {
        return (
            <View>
                <Text>Migration error: {error.message}</Text>
            </View>
        );
    }

    if (!success) {
        return (
            <View>
                <Text>Migration is in progress...</Text>
            </View>
        );
    }

    if (items === null || items.length === 0) {
        return (
            <View>
                <Text>Empty</Text>
            </View>
        );
    }

    return (
        <SafeAreaView className="h-full" style={{ backgroundColor: "#fff" }}>
            <View style={{ marginHorizontal: 24 }}>
                {/* Top Navigation */}
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Text className="font-lexend text-[24px]">
                        Good Day, User!
                    </Text>
                    <View
                        style={{
                            flexDirection: "row",
                            gap: 5,
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                backgroundColor: "#E5F7FF",
                                borderRadius: 50,
                                padding: 10,
                            }}
                        >
                            <User color="#5FA7C6" size={20} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                backgroundColor: "#E5F7FF",
                                borderRadius: 50,
                                padding: 10,
                            }}
                        >
                            <Bell color="#5FA7C6" size={20} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Home Content */}
                {/* <SearchBar /> */}
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        width: "100%",
                        marginTop: 20,
                        borderRadius: 99,
                        paddingVertical: 1,
                        paddingHorizontal: 20,
                        backgroundColor: "#F5F5F5",
                    }}
                >
                    <Search size={20} color="#666" />
                    <TextInput
                        className="font-lexend text-[16px] text-[#666] font-[400]"
                        placeholder="Search transaction"
                        placeholderTextColor="#666"
                    />
                </View>
                {/* Budget Card */}
                <View
                    style={{
                        backgroundColor: "#F5F5F5",
                        width: "100%",
                        height: 150,
                        borderRadius: 12,
                        marginVertical: 10,
                        gap: 10,
                    }}
                >
                    <View
                        style={{
                            backgroundColor: "#DBF2FF",
                            height: 10,
                            borderRadius: 12,
                        }}
                    />
                    <View style={{ paddingVertical: 5, paddingHorizontal: 12 }}>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                            }}
                        >
                            {/* Dynamic Budget Name */}
                            <Text className="font-lexendSemiBold text-[16px]">
                                Budget Name
                            </Text>
                            {/* Clickable */}
                            <History color="#8D8F9A" width={15} />
                        </View>

                        <View className="flex flex-row">
                            {/* Dynamic Currency */}
                            <Text
                                className="font-lexend font-thin text-[#2B3854] "
                                style={{
                                    fontSize: 24,
                                    lineHeight: 60,
                                }}
                            >
                                ₱
                            </Text>
                            {/* Dynamic Budget Amount */}
                            <Text
                                className="font-lexend font-thin text-[#2B3854]"
                                style={{ fontSize: 40 }}
                                numberOfLines={1}
                            >
                                0
                            </Text>
                        </View>
                    </View>

                    {/* Progress Bar */}
                    <View
                        style={{
                            backgroundColor: "#E3E3E3",
                            height: 12,
                            borderRadius: 12,
                            marginHorizontal: 12,
                            marginTop: -18,
                        }}
                    />
                    <View
                        className="flex-row justify-between"
                        style={{ paddingHorizontal: 12, marginTop: -8 }}
                    >
                        <Text
                            className="font-lexend font-thin text-gray-700"
                            style={{ fontSize: 14 }}
                        >
                            ₱0 spent
                        </Text>
                        <Text
                            className="font-lexend font-thin text-gray-700"
                            style={{ fontSize: 14 }}
                        >
                            0%
                        </Text>
                    </View>
                </View>

                {/* Expenses and Income  */}
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    <View
                        className="flex-row justify-between gap-2 "
                        style={{
                            backgroundColor: "#F5F5F5",
                            width: "48%",
                            height: 70,
                            borderRadius: 12,
                            padding: 12,
                            alignContent: "center",
                        }}
                    >
                        <View>
                            <Text className="font-lexendSemiBold">
                                Expenses
                            </Text>
                            <Text
                                className="font-lexend text-gray-700"
                                style={{ fontSize: 12 }}
                            >
                                0 Transactions
                            </Text>
                        </View>
                        <Text
                            className="font-lexend"
                            style={{
                                color: "#FD7474",
                                fontSize: 14,
                                flexShrink: 1,
                                textAlign: "right",
                            }}
                            numberOfLines={1}
                        >
                            ₱0
                        </Text>
                    </View>
                    <View
                        className="flex-row justify-between gap-2"
                        style={{
                            backgroundColor: "#F5F5F5",
                            width: "48%",
                            height: 70,
                            borderRadius: 12,
                            padding: 12,
                        }}
                    >
                        <View>
                            <Text className="font-lexendSemiBold">Income</Text>
                            <Text
                                className="font-lexend text-gray-700"
                                style={{ fontSize: 12 }}
                            >
                                0 Transactions
                            </Text>
                        </View>
                        <Text
                            className="font-lexend"
                            style={{
                                color: "#67AC69",
                                fontSize: 14,
                                flexShrink: 1,
                                textAlign: "right",
                            }}
                            numberOfLines={1}
                        >
                            ₱0
                        </Text>
                    </View>
                </View>
                {/* Streaks */}
                <View
                    style={{
                        flexDirection: "row",
                        gap: 10,
                        width: "100%",
                        height: 50,
                        borderRadius: 20,
                        marginTop: 20,
                        justifyContent: "space-around",
                    }}
                >
                    {days.map((day, index) => (
                        <View
                            key={index}
                            style={{
                                alignItems: "center",
                            }}
                        >
                            <Image
                                source={require("@/assets/home/no-flame.svg")}
                                style={{
                                    width: 16,
                                    height: 16,
                                }}
                            />
                            <Text
                                className="font-lexend text-[12px]"
                                style={{
                                    color: "#CACACA",
                                }}
                            >
                                {day}
                            </Text>
                        </View>
                    ))}
                </View>
                {/* Recent Transactions */}
                <View>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Text className="font-lexend text-[16px]">
                            Recent Transactions
                        </Text>
                        <TouchableOpacity
                            style={{
                                backgroundColor: "#F8F8F8",
                                borderRadius: 99,
                                paddingVertical: 5,
                                paddingHorizontal: 10,
                            }}
                        >
                            <Filter color="#8D8F9A" width={15} />
                        </TouchableOpacity>
                    </View>

                    {/* Recent Transactions Stack */}
                    <View>
                        <Text
                            className="font-lexend text-[13px]"
                            style={{ color: "#C2C2C2" }}
                        >
                            {/* Dynamic Time */}
                            Today, 12:00 PM
                        </Text>

                        {/* Empty State */}
                        <View
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                                marginVertical: 10,
                                height: 180,
                                borderColor: "#D9D9D9",
                                borderWidth: 2,
                                borderRadius: 10,
                                borderStyle: "dashed",
                            }}
                        >
                            <Text className="font-lexend text-[14px] text-gray-700">
                                {" "}
                                + Add Transaction!
                            </Text>

                            {/* Loading State */}
                            {/* <View
                            className="flex-col justify-center gap-2"
                            style={{
                                marginVertical: 10,
                               
                            }}
                            > */}
                            {/* <View
                                style={{
                                    backgroundColor: "#F5F5F5",
                                    width: "100%",
                                    height: 50,
                                    borderRadius: 10,
                                }}
                            /> */}

                            {/* onPress={nextRoute}  */}
                            {/* <Pressable>
                                <Text className="text-center">View more</Text>
                            </Pressable> */}
                        </View>
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    <TouchableOpacity
                        style={{
                            backgroundColor: "#F5F5F5",
                            width: "48%",
                            height: 90,
                            borderRadius: 10,
                            padding: 10,
                            gap: 5,
                        }}
                    >
                        <Image
                            source={require("@/assets/home/view-transactions.svg")}
                            style={{
                                width: 38,
                                height: 38,
                            }}
                        />
                        <Text className="font-lexend text-[12px] text-gray-900">
                            View Transactions
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            backgroundColor: "#F5F5F5",
                            width: "48%",
                            height: 90,
                            borderRadius: 10,
                            padding: 10,
                            gap: 5,
                        }}
                    >
                        <Image
                            source={require("@/assets/home/add-transactions.svg")}
                            style={{
                                width: 55,
                                height: 38,
                            }}
                        />

                        <Text className="font-lexend text-[12px] text-gray-900">
                            Add Transactions
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
        </SafeAreaView>
    );
}
