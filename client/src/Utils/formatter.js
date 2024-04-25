export const formateador = (numero) => {
    let numeroFormateado = numero
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    numeroFormateado = numeroFormateado + " Gs.";
    return numeroFormateado;
};
