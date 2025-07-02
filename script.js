let progreso = 0;
const corazon = document.getElementById("corazonLleno");
const progresoText = document.getElementById("progresoText");
const preguntaTexto = document.getElementById("preguntaTexto");
const mensajeFinal = document.getElementById("mensajeFinal");

const preguntas = [
  {
    texto: "今日は愛されていると感じましたか？",
    efecto: { si: +10, no: +5 },
    mensaje: {
      si: "少しでも愛されていると感じられて、本当にうれしいです。",
      no: "今日はそう感じられなくても大丈夫。今ここでは、あなたは確かに愛されています。"
    }
  },
  {
    texto: "微笑ませてくれる素敵な思い出がありますか？",
    efecto: { si: +10, no: +5 },
    mensaje: {
      si: "その思い出は、あなたが思っている以上に大切なものです。大切にしてね。",
      no: "良い記憶を思い出すのが難しい時もある…でも、それは存在しないという意味ではありません。"
    }
  },
  {
    texto: "たとえ苦しくても、前に進みたいと思いますか？",
    efecto: { si: +10, no: +5 },
    mensaje: {
      si: "前に進みたいという気持ちは、すでに強さの証です。",
      no: "進みたくないと感じるのも自然なこと。今ここにいることがすでに大切な一歩です。"
    }
  },
  {
    texto: "今、ひとりぼっちだと感じていますか？",
    efecto: { si: +5, no: +7 },
    mensaje: {
      si: "伝えてくれてありがとう。孤独を感じることは、決して弱さではありません。",
      no: "少しの間でも、孤独でないと感じられたことがとても尊いです。"
    }
  },
  {
    texto: "まだ美しい何かがあなたを待っていると信じていますか？",
    efecto: { si: +14, no: +5 },
    mensaje: {
      si: "きっとあります。そしてあなたは、それを気づかぬうちに創り出しているのです。",
      no: "今は見えなくても、大切な驚きは、きっと訪れます。"
    }
  },
  {
    texto: "他人を信じるのが難しいと感じますか？",
    efecto: { si: +10, no: +3 },
    mensaje: {
      si: "傷ついた後に信じるのは、簡単ではありません。あなたが自分を守っていること、それ自体が勇気です。",
      no: "再び心を開くのは勇敢なこと。その一歩を踏み出せているあなたを嬉しく思います。"
    }
  },
  {
    texto: "自分は十分じゃないと感じたことはありますか？",
    efecto: { si: +5, no: +10 },
    mensaje: {
      si: "あなたは、どんな日であっても、ありのままで十分すぎるほどです。",
      no: "自分の価値を認めること、それは自分自身への愛です。どうか忘れないでください。"
    }
  },
  {
    texto: "誰かに、判断されずに話を聞いてほしいと思いますか？",
    efecto: { si: +10, no: +5 },
    mensaje: {
      si: "ここでは、怖がらなくていい。あなたの真実は、大切にされるべきものです。",
      no: "ただ静かにいることも、癒しの一部です。"
    }
  },
  {
    texto: "自分のせいではなかったことを、許せましたか？",
    efecto: { si: +15, no: +5 },
    mensaje: {
      si: "それは、解放です。その贈り物を自分に与えられたあなたを、誇りに思います。",
      no: "まだ難しくても、大丈夫。あなたはあなたのペースで、癒えていけます。"
    }
  },
  {
    texto: "恥ずかしがらずに、自分を抱きしめたいと思いますか？",
    efecto: { si: +12, no: +5 },
    mensaje: {
      si: "やさしさを持って自分を包んで。心と体、両方がその抱擁を必要としています。",
      no: "その気持ちを持つあなたは一人じゃない。もしできるなら、私がそっとその腕に寄り添いたい。"
    }
  }
];

let indice = 0;

function mostrarPregunta() {
  if (indice >= preguntas.length) {
    mostrarFinal();
    return;
  }
  preguntaTexto.textContent = preguntas[indice].texto;
}

function responder(respuesta) {
  const pregunta = preguntas[indice];
  const efecto = pregunta.efecto[respuesta];
  const mensaje = pregunta.mensaje?.[respuesta] || "";

  progreso = Math.max(5, Math.min(100, progreso + efecto));
  actualizarCorazon();
  mostrarMensajeTemporal(mensaje);

  indice++;
  setTimeout(mostrarPregunta, 2000);
}

function actualizarCorazon() {
  const altura = (1 - progreso / 100) * 200;
  corazon.setAttribute("y", altura);
  corazon.setAttribute("height", 200 - altura);
  progresoText.textContent = `あなたの心が語っています（${progreso}%）`;
}

function mostrarMensajeTemporal(texto) {
  const mensajeBox = document.createElement("p");
  mensajeBox.className = "mensaje-empatico";
  mensajeBox.textContent = texto;
  preguntaTexto.innerHTML = "";
  preguntaTexto.appendChild(mensajeBox);
}

function mostrarFinal() {
  preguntaTexto.textContent = "";
  document.querySelector(".botones-respuesta").style.display = "none";
  mensajeFinal.style.display = "block";
  document.getElementById("diarioBox").style.display = "block";
  document.getElementById("cosasBox").style.display = "block";
}

function guardarDiario() {
  const texto = document.getElementById("entradaDiario").value;
  if (texto.trim() !== "") {
    localStorage.setItem("diarioMiya", texto);
    document.getElementById("diarioGuardado").style.display = "block";
  }
}

function enviarPedidosAMarc() {
  const checkboxes = document.querySelectorAll("#formPedidos input[type='checkbox']");
  const pedidos = [];

  checkboxes.forEach(checkbox => {
    if (checkbox.checked) {
      pedidos.push(checkbox.value);
    }
  });

  fetch("https://script.google.com/macros/s/AKfycbz7pzcml7Y1InXaad_A4DtO7AWKJdrddOQNCDPx4hsSoen5SdBABz7E_t9-vmOsZyqYXw/exec", {
    method: "POST",
    body: JSON.stringify({ pedidos }),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(() => {
      const msg = document.createElement("p");
      msg.textContent = "🌷 あなたの願いは静かにマルクへ届けられました。";
      msg.style.color = "#ccc";
      document.getElementById("cosasBox").appendChild(msg);
    })
    .catch(error => console.error("願いの送信中にエラーが発生しました:", error));
}

document.querySelectorAll("#formPedidos input[type='checkbox']").forEach(checkbox => {
  checkbox.addEventListener("change", enviarPedidosAMarc);
});

mostrarPregunta();
actualizarCorazon();
