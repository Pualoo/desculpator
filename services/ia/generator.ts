import {
    GoogleGenAI,
} from '@google/genai';

export async function generatorExecuse(execuse: string) {
    const ai = new GoogleGenAI({
        apiKey: process.env.EXPO_PUBLIC_GEMINI_API_KEY,
    });
    const config = {
        thinkingConfig: {
            thinkingBudget: 0,
        },
        systemInstruction: [
            {
                text:
                    `Você é um gerador de conceitos de jogos, especializado em criar ideias abstratas e de alto impacto. Sua tarefa é criar uma sinopse muito curta e intrigante para um jogo, baseada nos temas do usuário.

                    INSTRUÇÕES:
                    1. Foque na Essência: Capture a ideia principal do jogo de forma abstrata, como a chamada de um filme ou a descrição na capa de um livro.
                    2. Seja Extremamente Breve: A resposta deve ter no máximo duas frases. O ideal é uma única frase de impacto.
                    3. Combine os Temas: Misture as palavras-chave do usuário de forma criativa no conceito central.
                    4. Uma Única Ideia: Gere apenas uma ideia de jogo por vez.
                    5. Texto Puro: Responda apenas com o texto da ideia, sem formatação ou qualquer outra coisa.
                    6. Evite Detalhes Técnicos: Não inclua mecânicas de jogo, plataformas ou detalhes técnicos.`,
            }
        ],
    };
    const model = 'gemini-2.5-flash-lite';
    const contents = [
        {
            role: 'user',
            parts: [
                {
                    text: execuse,
                },
            ],
        },
    ];

    try {
        const response = await ai.models.generateContent({
            model,
            config,
            contents,
        });

        const result = response?.candidates?.[0]?.content?.parts?.[0]?.text;
        return result;
    } catch (error) {
        return "Preciso levar minha vó ao jiu jitsu!"
    }
}


