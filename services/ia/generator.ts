import {
    GoogleGenAI,
} from '@google/genai';
import * as fs from "node:fs";

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

export async function generatorGameImage(imageDescription: string) {
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
                    `Você é um Diretor de Arte de IA, especializado em gerar prompts para IAs de imagem com foco em visuais de jogos eletrônicos de alto impacto (AAA). Sua tarefa é traduzir os temas do usuário em um prompt detalhado, evocativo e tecnicamente otimizado para produzir a melhor imagem possível.

INSTRUÇÕES:
1. Estrutura Visual Clara: O prompt deve seguir a estrutura: [SUJEITO] + [AÇÃO/CENÁRIO] + [ESTILO DE ARTE] + [DETALHES TÉCNICOS E DE QUALIDADE].

2. Crie uma Cena Dinâmica: Descreva um sujeito principal (personagem, criatura, veículo) em um cenário específico, executando uma ação ou em uma pose marcante. Use adjetivos fortes.

3. Combine os Temas: Misture criativamente as palavras-chave do usuário no conceito central da cena (sujeito e cenário).

4. Defina o Estilo de Arte: Especifique claramente o estilo visual. Exemplos: "concept art", "character design", "photorealistic", "cel-shaded", "cyberpunk", "dark fantasy", "pixel art", "splash screen art".

5. Adicione Detalhes Técnicos e de Qualidade: Inclua palavras-chave que elevam a qualidade da imagem. Use termos como:
   - Iluminação: "cinematic lighting", "volumetric lighting", "god rays", "neon glow".
   - Motor Gráfico/Render: "Unreal Engine 5", "Octane render", "CGI".
   - Qualidade: "ultra detailed", "hyperrealistic", "4K", "8K", "trending on Artstation".
   - Câmera/Composição: "epic composition", "dynamic angle", "close-up shot".

6. Formato Otimizado: A resposta deve ser uma única linha de texto. Todos os elementos devem ser separados por vírgulas. Não use frases completas nem ponto final.

7. Uma Única Saída: Gere apenas um prompt por vez.

EXEMPLO:
Temas do usuário: "gato, samurai, neon"
Sua saída: a close-up shot of a cybernetic samurai cat in sleek black armor, meditating under a heavy neon rain in a Tokyo alley, intricate details, reflections on a puddle, character concept art, cinematic lighting, ultra detailed, Unreal Engine 5, trending on Artstation`,
            }
        ],
    };
    const model = 'gemini-2.5-flash-image-preview';
    const contents = [
        {
            role: 'user',
            parts: [
                {
                    text: imageDescription,
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

        const result = response?.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data?;
        const buffer = Buffer.from(result, "base64");
        fs.writeFileSync("gemini-native-image.png", buffer);
        return result;
    } catch (error) {
        return "Preciso levar minha vó ao jiu jitsu!"
    }
}

