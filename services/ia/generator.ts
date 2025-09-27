import { GoogleGenAI } from "@google/genai";
import * as FileSystem from "expo-file-system";

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
        text: `Você é um gerador de conceitos de jogos, especializado em criar ideias abstratas e de alto impacto. Sua tarefa é criar uma sinopse muito curta e intrigante para um jogo, baseada nos temas do usuário.

                    INSTRUÇÕES:
                    1. Foque na Essência: Capture a ideia principal do jogo de forma abstrata, como a chamada de um filme ou a descrição na capa de um livro.
                    2. Seja Extremamente Breve: A resposta deve ter no máximo duas frases. O ideal é uma única frase de impacto.
                    3. Combine os Temas: Misture as palavras-chave do usuário de forma criativa no conceito central.
                    4. Uma Única Ideia: Gere apenas uma ideia de jogo por vez.
                    5. Texto Puro: Responda apenas com o texto da ideia, sem formatação ou qualquer outra coisa.
                    6. Evite Detalhes Técnicos: Não inclua mecânicas de jogo, plataformas ou detalhes técnicos.`,
      },
    ],
  };
  const model = "gemini-2.5-flash-lite";
  const contents = [
    {
      role: "user",
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
    return "Preciso levar minha vó ao jiu jitsu!";
  }
}

export async function generatorGameImage(imageDescription: string) {
  const ai = new GoogleGenAI({
    apiKey: process.env.EXPO_PUBLIC_GEMINI_API_KEY,
  });
  const config = {
    numberOfImages: 4,
    systemInstruction: [
      {
        text: `PROMPT FOR DIRECT IMAGE GENERATION:
        (CRITICAL: Do not write text, descriptions, or explanations. Generate only the final image based on these keywords. The main subject is based on the user's game idea.)

        SUBJECT: [INSERIR A DESCRIÇÃO DO JOGO AQUI]

        CORE DIRECTIVE:
        An authentic in-game screenshot from a video game.

        ART STYLE:
        Playstation 2 / GameCube era graphics, Y2K aesthetic, low-poly 3D models, slightly pixelated textures, vibrant but limited color palette, baked lighting, 4:3 aspect ratio framing.

        GAMEPLAY ELEMENTS:
        Visible and clear Heads-Up Display (HUD) is mandatory. The HUD must include at least two of the following: a stylized health bar, a simple mini-map, an ammo counter, or a quest objective. The UI design itself must match the retro Y2K style with chunky fonts or icons. The gameplay perspective should be a third-person over-the-shoulder view or a fixed camera angle.

        COMPOSITION & QUALITY:
        Dynamic action shot, cinematic but in-game, clean composition, polished for its era.`,
      },
    ],
  };
  const model = "imagen-3.0-generate-002";
  const prompt =
    "Gere uma imagem de um videogame com HUD e com essa descrição: " +
    imageDescription;

  try {
    const response = await ai.models.generateImages({
      model,
      config,
      prompt,
    });

    const result = response?.generatedImages?.[0]?.image?.imageBytes!;
    const fileUri = FileSystem.cacheDirectory + "gemini-native-image.png";

    await FileSystem.writeAsStringAsync(fileUri, result, {
      encoding: FileSystem.EncodingType.Base64,
    });

    console.log("Imagem salva em:", fileUri);

    return fileUri;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}
