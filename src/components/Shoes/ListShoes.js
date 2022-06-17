import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Card, Button } from 'react-native-elements'

export default function ListShoes(props) {
    return (
        <ScrollView style={{backgroundColor: 'white'}} horizontal={true}>
            {props.data.map((item) => (
                <Card key={item.title} style={styles.card}>
                    <Card.Image 
                        source={{uri: item.image}} 
                        style={{
                            width: 220,
                            height: 110
                        }}
                        resizeMode="cover"
                    />
                    <Card.Divider/>
                    <Card.Title>
                        {item.title}
                    </Card.Title>
                    <Card.Divider/>
                    <Button 
                        title="Choose" 
                        style={{height: 35}}
                        onPress={() => props.sendBotResponse(item.title)}>
                    </Button>
                </Card>
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 15,
        padding: 0,
        paddingTop: 7,
        overflow: 'hidden'
    }
})