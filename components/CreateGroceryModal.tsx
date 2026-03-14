import { useState } from "react";

import {
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { useGroceryStore } from "@/store/groceryStore";

type ProductDraft = {
    name: string;
    quantity: string;
    price: string;
};

type Props = {
    visible: boolean;
    onClose: () => void;
};

export default function CreateGroceryModal({
    visible,
    onClose,
}: Props) {

    const addProducts = useGroceryStore((s) => s.addProducts);

    const [items, setItems] = useState<ProductDraft[]>([
        { name: "", quantity: "", price: "" },
    ]);



    const updateItem = (
        index: number,
        field: keyof ProductDraft,
        value: string
    ) => {

        const updated = [...items];

        updated[index][field] = value;

        setItems(updated);

    };



    const addRow = () => {

        setItems([
            ...items,
            { name: "", quantity: "", price: "" },
        ]);

    };



    const handleCreate = () => {

        const validProducts = items
            .filter((i) => i.name.trim() !== "")
            .map((i) => ({
                id: Date.now().toString() + Math.random(),
                name: i.name,
                quantity: i.quantity,
                price: i.price,
            }));

        if (validProducts.length === 0) return;

        addProducts(validProducts);

        setItems([{ name: "", quantity: "", price: "" }]);

        onClose();

    };



    return (

        <Modal
            visible={visible}
            animationType="slide"
        >

            <View style={styles.container}>

                <Text style={styles.title}>
                    Add Products
                </Text>


                <ScrollView>

                    {items.map((item, index) => (

                        <View
                            key={index}
                            style={styles.row}
                        >

                            <TextInput
                                placeholder="Name *"
                                style={styles.name}
                                value={item.name}
                                onChangeText={(t) =>
                                    updateItem(index, "name", t)
                                }
                            />

                            <TextInput
                                placeholder="Qty"
                                style={styles.small}
                                value={item.quantity}
                                keyboardType="number-pad"
                                onChangeText={(t) =>
                                    updateItem(index, "quantity", t)
                                }
                            />

                            <TextInput
                                placeholder="$"
                                style={styles.small}
                                value={item.price}
                                keyboardType="decimal-pad"
                                onChangeText={(t) =>
                                    updateItem(index, "price", t)
                                }
                            />

                        </View>

                    ))}


                    <TouchableOpacity
                        style={styles.addMore}
                        onPress={addRow}
                    >

                        <Text style={styles.addMoreText}>
                            + Add another product
                        </Text>

                    </TouchableOpacity>

                </ScrollView>


                <TouchableOpacity
                    style={styles.createButton}
                    onPress={handleCreate}
                >

                    <Text style={styles.createText}>
                        Create Grocery List
                    </Text>

                </TouchableOpacity>

            </View>

        </Modal>

    );

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 24,
        backgroundColor: "#F7F8FA",
    },

    title: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 20,
    },

    row: {
        flexDirection: "row",
        marginBottom: 10,
    },

    name: {
        flex: 2,
        backgroundColor: "white",
        padding: 10,
        borderRadius: 8,
        marginRight: 6,
    },

    small: {
        flex: 1,
        backgroundColor: "white",
        padding: 10,
        borderRadius: 8,
        marginLeft: 6,
    },

    addMore: {
        marginTop: 10,
    },

    addMoreText: {
        color: "#4F46E5",
        fontWeight: "600",
    },

    createButton: {
        marginTop: 20,
        backgroundColor: "#4F46E5",
        padding: 14,
        borderRadius: 10,
        alignItems: "center",
    },

    createText: {
        color: "white",
        fontWeight: "600",
        fontSize: 16,
    },

});