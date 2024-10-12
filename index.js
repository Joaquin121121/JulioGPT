const preguntaInput = document.getElementById("pregunta");
const respuestaDiv = document.getElementById("respuesta");

document.getElementById("preguntar").addEventListener("click", preguntar);

async function preguntar() {
  respuestaDiv.innerText = "";

  try {
    const apiKey =
      "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"; // Replace with your OpenAI API key
    const question = preguntaInput.value;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // Use "gpt-3.5-turbo" or "gpt-4" if needed
        messages: [
          {
            role: "user",
            content: question,
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    respuestaDiv.innerText = data.choices[0].message.content;
  } catch (error) {
    console.error("Error:", error);
    respuestaDiv.innerText = "An error occurred. Please try again.";
  }
}
