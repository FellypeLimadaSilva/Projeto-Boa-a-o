document.addEventListener("DOMContentLoaded", async () => {
    const vagasContainer = document.getElementById("vagas-container");

    try {
        // Fazendo a requisição para buscar os trabalhos
        const response = await fetch("http://localhost:5500/works");
        if (!response.ok) {
            throw new Error("Erro ao buscar os trabalhos");
        }

        const { success, body: works } = await response.json();

        if (success && works.length > 0) {
            renderWorks(works);
        } else {
            vagasContainer.innerHTML = "<p>Nenhum trabalho encontrado.</p>";
        }
    } catch (error) {
        console.error("Erro ao buscar os trabalhos:", error);
        vagasContainer.innerHTML = "<p>Erro ao carregar os trabalhos. Tente novamente mais tarde.</p>";
    }
});

// Função para renderizar os trabalhos como cards
function renderWorks(works) {
    const vagasContainer = document.getElementById("vagas-container");

    const cards = works.map(work => {
        return `
            <div class="vaga">
                <h3>${work.nomeCliente}</h3>
                <p><strong>Carga Horária:</strong> ${work.cargaHoraria} horas</p>
                <p><strong>Valor:</strong> R$ ${parseFloat(work.valor).toFixed(2)}</p>
                <p><strong>Período:</strong> ${work.periodo}</p>
                <p><strong>Serviço:</strong> ${work.tipoServico}</p>
                <button class="btn-aceitar">Aceitar</button>
            </div>
        `;
    });

    vagasContainer.innerHTML = cards.join("");
}