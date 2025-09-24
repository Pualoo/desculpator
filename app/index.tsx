import { generatorExecuse } from "@/services/ia/generator";
import { styles } from "@/styles";
import { MotiView } from 'moti';
import React, { useState } from "react";
import { StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Index() {
  const [excuse, setExcuse] = useState('')
  const [answer, setAnswer] = useState('');
  const [isLoading, setLoading] = useState(false)


  const handlePress = async () => {

    if (excuse.length < 5) {
      alert("Mensagem muito curta!")
      return;
    }

    setLoading(true)
    setAnswer('')
    const result = await generatorExecuse(excuse);
    setAnswer(result || "...");
    setLoading(false);
  }

  return (
    <View
      style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#333" /> 
      <Text style={{ ...styles.title, color: '#eee' }}>💡 Gerador de Ideias de Jogos 🎮</Text>
      <Text style={{ ...styles.subtitle, color: '#ccc' }}>Sem ideias? 🤔 Deixe a gente gerar uma nova pra você! ✨</Text>
      <TextInput
        value={excuse}
        onChangeText={setExcuse} 
        style={styles.input}
        placeholder="Digite palavras-chave para sua ideia de jogo..."
      />
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={{...styles.button_text, paddingHorizontal: 20}}>
          {isLoading ? "Gerando..." : "Gerar Ideia de Jogo!"}
          </Text>
      </TouchableOpacity>

      {answer && <MotiView
        from={{ opacity: 0, translateY: 200 }}
        animate={{ opacity: 1, translateY: 0 }} 
        style={styles.card}>
        <Text style={styles.card_title}>Sua Ideia de Jogo:</Text>
        <Text style={styles.card_text}>{answer}</Text>
      </MotiView>}
    </View>
  );
}
