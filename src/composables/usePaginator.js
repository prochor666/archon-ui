export const pageize = function (data) {
    if (data.items.length > data.perPage) {
        data.result = data.items.slice(
            (data.page - 1) * data.perPage,
            (data.page - 1) * data.perPage + data.perPage,
        );
    } else {
        data.result = data.items;
    }
    return data.result;
};

export const emulate = function (data, total) {
    let items = [];
    for (let i = 0; i <= total * data.perPage; i++) {
        items[i] = `x${i}`;
    }
    return items;
};

export const usePaginator = async () => {
    return {
        pageize: pageize,
        emulate: emulate,
    };
};

export default usePaginator;
