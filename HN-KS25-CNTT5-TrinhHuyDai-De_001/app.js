let books = [
    { bookCode: "BOK-001", title: "Lập Trình Căn Bản", author: "Nguyễn Hữu Tài", publishYear: 2018, quantity: 12 },
    { bookCode: "BOK-002", title: "Cấu Trúc Dữ Liệu", author: "Trần Minh Đức", publishYear: 2020, quantity: 8 },
    { bookCode: "BOK-003", title: "Thiết Kế Web Hiện Đại", author: "Nguyễn Hữu Tài", publishYear: 2023, quantity: 15 }
];

function validateBookCode(code) {
    if (code === "") return "Lỗi: Chưa nhập mã đầu sách";
    if (code.length < 6) return "Lỗi: Độ dài nhỏ hơn 6 ký tự";
    if (code.indexOf("BOK-") !== 0) return "Lỗi: Sai tiền tố BOK-";
    if (code.indexOf(" ") !== -1) return "Lỗi: Chứa khoảng trắng";
    for (let i = 0; i < books.length; i++) {
        if (books[i].bookCode === code) return "Lỗi: Mã đầu sách đã tồn tại";
    }
    return "";
}

function findBookIndex(code) {
    for (let i = 0; i < books.length; i++) {
        if (books[i].bookCode === code) return i;
    }
    return -1;
}

function normalizeText(rawText) {
    let wordList = rawText.trim().split(" ");
    let result = "";
    for (let i = 0; i < wordList.length; i++) {
        let word = wordList[i];
        if (word !== "") {
            let fullWord = word[0].toUpperCase() + word.slice(1).toLowerCase();
            if (result === "") result = fullWord;
            else result = result + " " + fullWord;
        }
    }
    return result;
}

function inputIntegerInRange(message, min, max) {
    while (true) {
        let inputString = prompt(message);
        if (inputString === null) return null;
        inputString = inputString.trim();
        if (inputString === "") {
            console.log("Lỗi: chưa nhập, nhập lại");
            continue;
        }
        let convertedNumber = parseInt(inputString);
        if (isNaN(convertedNumber) || inputString.indexOf(".") !== -1) {
            console.log("Lỗi: không phải số nguyên, nhập lại");
            continue;
        }
        if (convertedNumber < min || convertedNumber > max) {
            console.log(`Lỗi: ngoài phạm vi ${min} – ${max}, nhập lại`);
            continue;
        }
        return convertedNumber;
    }
}

function displayBooks(bookList) {
    if (bookList.length === 0) {
        console.log("Danh sách đầu sách trống");
        return;
    }
    for (let i = 0; i < bookList.length; i++) {
        let book = bookList[i];
        console.log(`${i + 1}. ${book.bookCode} - ${book.title} - ${book.author}`);
        console.log(`Năm xuất bản: ${book.publishYear} | Số lượng: ${book.quantity}`);
    }
    console.log(`Tổng: ${bookList.length} đầu sách`);
}

function showBooks() {
    displayBooks(books);
}

function addBook() {
    let bookCode = prompt("Nhập mã đầu sách:");
    if (bookCode === null) return;
    bookCode = bookCode.trim().toUpperCase();
    let errorMessage = validateBookCode(bookCode);
    if (errorMessage !== "") {
        console.log(errorMessage);
        return;
    }

    let title = prompt("Nhập tên sách:");
    if (title === null || title.trim() === "") return;

    let author = prompt("Nhập tên tác giả:");
    if (author === null || author.trim() === "") return;

    let publishYear = inputIntegerInRange("Nhập năm xuất bản (1990 – 2026):", 1990, 2026);
    if (publishYear === null) return;

    let quantity = inputIntegerInRange("Nhập số lượng (1 - 50):", 1, 50);
    if (quantity === null) return;

    books.push({
        bookCode: bookCode,
        title: normalizeText(title),
        author: normalizeText(author),
        publishYear: publishYear,
        quantity: quantity
    });
    console.log("Thêm thành công");
}

function updateBook() {
    let bookCode = prompt("Nhập mã đầu sách cần cập nhật:");
    if (bookCode === null) return;
    let bookIndex = findBookIndex(bookCode.trim().toUpperCase());
    if (bookIndex === -1) {
        console.log(`Không tìm thấy đầu sách có mã ${bookCode}`);
        return;
    }

    let newPublishYear = inputIntegerInRange("Nhập năm xuất bản mới (1990 – 2026):", 1990, 2026);
    if (newPublishYear === null) return;

    let newQuantity = inputIntegerInRange("Nhập số lượng mới (1 - 50):", 1, 50);
    if (newQuantity === null) return;

    console.log(`Trước: ${books[bookIndex].publishYear} / ${books[bookIndex].quantity}`);
    books[bookIndex].publishYear = newPublishYear;
    books[bookIndex].quantity = newQuantity;
    console.log(`Sau: ${newPublishYear} / ${newQuantity}`);
    console.log("Cập nhật thành công");
}

function deleteBook() {
    let bookCode = prompt("Nhập mã đầu sách cần xóa:");
    if (bookCode === null) return;
    let bookIndex = findBookIndex(bookCode.trim().toUpperCase());
    if (bookIndex === -1) {
        console.log(`Không tìm thấy đầu sách có mã ${bookCode}`);
        return;
    }

    let confirmDelete = prompt("Xác nhận xóa (Y/N):");
    if (confirmDelete !== null && confirmDelete.trim().toLowerCase() === "y") {
        books.splice(bookIndex, 1);
        console.log(`Xóa thành công, còn ${books.length} đầu sách`);
    } else {
        console.log("Đã hủy thao tác xóa");
    }
}

function searchByAuthor() {
    let searchKeyword = prompt("Nhập từ khóa tìm kiếm:");
    if (searchKeyword === null || searchKeyword.trim() === "") {
        console.log("Chưa nhập từ khóa tìm kiếm");
        return;
    }

    let matchedBooks = [];
    for (let i = 0; i < books.length; i++) {
        if (books[i].author.indexOf(searchKeyword.trim()) !== -1) {
            matchedBooks.push(books[i]);
        }
    }

    if (matchedBooks.length === 0) {
        console.log("Không tìm thấy đầu sách phù hợp");
    } else {
        displayBooks(matchedBooks);
    }
}

let isRunning = true;
while (isRunning) {
    let choice = prompt(`
====================================
HỆ THỐNG QUẢN LÝ ĐẦU SÁCH THƯ VIỆN BÌNH MINH
====================================
1. Hiển thị danh sách đầu sách
2. Thêm đầu sách mới
3. Cập nhật thông tin đầu sách
4. Xóa đầu sách
5. Tìm kiếm đầu sách theo tác giả
0. Thoát chương trình
====================================
Vui lòng nhập lựa chọn của bạn (0 - 5):`);

    switch (choice) {
        case "1":
            showBooks();
            break;
        case "2":
            addBook();
            break;
        case "3":
            updateBook();
            break;
        case "4":
            deleteBook();
            break;
        case "5":
            searchByAuthor();
            break;
        case "0":
            console.log("Đã thoát chương trình");
            isRunning = false;
            break;
        default:
            console.log("Lựa chọn không hợp lệ");
            break;
    }
}