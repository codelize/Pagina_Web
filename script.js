document.addEventListener('DOMContentLoaded', function() {
    const items = document.querySelectorAll('.list .item');
    const indicators = document.querySelectorAll('.indicators ul li');
    const numberIndicator = document.querySelector('.indicators .number');
    const leftArrow = document.querySelector('.arrows .left');
    const rightArrow = document.querySelector('.arrows .right');
    const section = document.querySelector('section');
    let currentIndex = 0;
    let startX = 0;
    let isDragging = false;

    function updateActiveItem(index) {
        items.forEach(item => item.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));

        items[index].classList.add('active');
        indicators[index].classList.add('active');
        numberIndicator.textContent = `0${index + 1}`;
    }

    function showNextItem() {
        const nextIndex = (currentIndex + 1) % items.length;
        items[currentIndex].style.transition = 'transform 0.5s ease'; // Adiciona transição suave para a imagem atual
        items[nextIndex].style.transition = 'transform 0.5s ease'; // Adiciona transição suave para a próxima imagem
        items[currentIndex].style.transform = 'translateX(-100%)'; // Move a imagem atual para fora da tela à esquerda
        items[nextIndex].style.transform = 'translateX(0)'; // Move a próxima imagem para a posição original
        setTimeout(() => {
            items[currentIndex].style.transition = ''; // Remove a transição após a transição terminar
            items[nextIndex].style.transition = ''; // Remove a transição após a transição terminar
            currentIndex = nextIndex;
            updateActiveItem(currentIndex);
        }, 500); // Ajuste o tempo de acordo com a duração da transição em seu CSS
    }

    function showPreviousItem() {
        const prevIndex = (currentIndex - 1 + items.length) % items.length;
        items[currentIndex].style.transition = 'transform 0.5s ease'; // Adiciona transição suave para a imagem atual
        items[prevIndex].style.transition = 'transform 0.5s ease'; // Adiciona transição suave para a imagem anterior
        items[currentIndex].style.transform = 'translateX(100%)'; // Move a imagem atual para fora da tela à direita
        items[prevIndex].style.transform = 'translateX(0)'; // Move a imagem anterior para a posição original
        setTimeout(() => {
            items[currentIndex].style.transition = ''; // Remove a transição após a transição terminar
            items[prevIndex].style.transition = ''; // Remove a transição após a transição terminar
            currentIndex = prevIndex;
            updateActiveItem(currentIndex);
        }, 500); // Ajuste o tempo de acordo com a duração da transição em seu CSS
    }

    function handleMouseDown(event) {
        startX = event.clientX;
        isDragging = true;
        items[currentIndex].style.transition = 'none';
    }

    function handleMouseMove(event) {
        if (!isDragging) return;

        const currentX = event.clientX;
        const deltaX = currentX - startX;

        // Ajuste a sensibilidade de arrastar conforme necessário
        const sensitivity = 50;

        if (deltaX > sensitivity) {
            showPreviousItem();
            isDragging = false;
        } else if (deltaX < -sensitivity) {
            showNextItem();
            isDragging = false;
        }
    }

    function handleMouseUp(event) {
        isDragging = false;
        items[currentIndex].style.transition = '';
    }

    // Configura os listeners para as setas
    rightArrow.addEventListener('click', showNextItem);
    leftArrow.addEventListener('click', showPreviousItem);

    // Configura os listeners para os indicadores
    indicators.forEach(indicator => {
        indicator.addEventListener('click', () => {
            currentIndex = parseInt(indicator.getAttribute('data-index'));
            updateActiveItem(currentIndex);
        });
    });

    // Configura os listeners para o mouse
    section.addEventListener('mousedown', handleMouseDown);
    section.addEventListener('mousemove', handleMouseMove);
    section.addEventListener('mouseup', handleMouseUp);

    // Define o item ativo inicialmente
    updateActiveItem(currentIndex);
});
