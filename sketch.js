let temperatura = 40;
let arvores = [];
let tempoUltimoPlante = 0;
let intervaloPlante = 1000; // 1 segundo
let tempoTotal = 30; // segundos
let tempoInicial;
let jogoAtivo = true;
let arvoresPlantadas = 0;

function setup() {
  createCanvas(600, 400);
  textAlign(CENTER, CENTER);
  textSize(20);
  tempoInicial = millis();
}

function draw() {
  // Atualizar cronômetro
  let tempoDecorrido = int((millis() - tempoInicial) / 1000);
  let tempoRestante = max(0, tempoTotal - tempoDecorrido);

  // Fim do jogo
  if (tempoRestante === 0 && jogoAtivo) {
    jogoAtivo = false;
  }

  // Fundo baseado na temperatura
  let fundo = color(map(temperatura, 10, 40, 0, 255), map(temperatura, 10, 40, 255, 0), 0);
  background(fundo);

  fill(255);
  text("Temperatura global: " + nf(temperatura, 2, 1) + "°C", width / 2, 30);
  text("Tempo restante: " + tempoRestante + "s", width / 2, 60);
  text("Árvores plantadas: " + arvoresPlantadas, width / 2, 90);

  if (!jogoAtivo) {
    fill(255);
    textSize(24);
    text("FIM DE JOGO!", width / 2, height / 2);
    text("Temperatura final: " + nf(temperatura, 2, 1) + "°C", width / 2, height / 2 + 40);
    text("Você plantou " + arvoresPlantadas + " árvores!", width / 2, height / 2 + 70);
    noLoop(); // Para de desenhar
  }

  for (let arvore of arvores) {
    drawArvore(arvore.x, arvore.y);
  }
}

function mousePressed() {
  let agora = millis();
  if (jogoAtivo && agora - tempoUltimoPlante > intervaloPlante && temperatura > 10) {
    arvores.push({ x: mouseX, y: mouseY });
    temperatura -= 0.5;
    tempoUltimoPlante = agora;
    arvoresPlantadas++;
  }
}

function drawArvore(x, y) {
  stroke(101, 67, 33);
  strokeWeight(6);
  line(x, y, x, y - 30);

  noStroke();
  fill(34, 139, 34);
  ellipse(x, y - 40, 30, 30);
  ellipse(x - 10, y - 30, 30, 30);
  ellipse(x + 10, y - 30, 30, 30);
}
