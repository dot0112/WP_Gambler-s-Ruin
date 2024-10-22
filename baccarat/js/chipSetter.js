var chips = [1, 5, 10, 25, 50, 100, 500, 1000, 5000, 10000, 25000];

export function chipSetter(money, chipSlot, chipExample, min_x, max_x, stride) {
    const count = chipCalculator(money);
    chipSlot
        .querySelectorAll(`.clone${chipSlot.id}`)
        .forEach((el) => el.remove());
    for (let i = 0, rightPx = min_x; i < chips.length; i++) {
        for (let j = 0; j < count[i]; j++, rightPx += stride) {
            const clonedChip = chipExample.cloneNode(true);
            clonedChip.id = `clone${chipSlot.id}_${i}_${j}`;
            rightPx = Math.min(rightPx, max_x);
            clonedChip.style.right = `${rightPx}px`;
            clonedChip.style.opacity = 1;
            clonedChip.style.rotate = `${
                Math.floor(Math.random() * 12) - 6
            }deg`;
            clonedChip.classList.add(`clone${chipSlot.id}`);
            clonedChip.src = `/images/chip_${chips[i]}.png`;
            chipSlot.appendChild(clonedChip);
        }
    }
}

function chipCalculator(money) {
    var count = Array(chips.length).fill(0);

    for (let i = chips.length - 1; i >= 0; i--) {
        count[i] = Math.floor(money / chips[i]);
        money %= chips[i];
    }

    return count;
}
