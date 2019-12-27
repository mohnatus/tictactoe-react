export default function getPositionByIndex (index) {
    let row = Math.floor(index / 3);
    let col = index % 3;
    return `Строка ${row + 1}, колонка ${col + 1}`;
}