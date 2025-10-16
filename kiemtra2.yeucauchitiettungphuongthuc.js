class HocSinh {
  constructor(ma, hoTen, lopHoc, diemTB, hanhKiem) {
    this.ma = ma;
    this.hoTen = hoTen;
    this.lopHoc = lopHoc;
    this.diemTB = diemTB;
    this.hanhKiem = hanhKiem;
  }
}

const danhSachHocSinh = [
  new HocSinh("ma2023100", "Hoàng Đức A", "10A1", 8.5, "Khá"),
  new HocSinh("ma2023101", "Thiên Phúc B", "10A2", 9.2, "Tốt"),
];

let soLuongHocSinh = danhSachHocSinh.length;
const currentYear = new Date().getFullYear();

function sinhMaHocSinh() {
  soLuongHocSinh++;
  return `ma${currentYear}${soLuongHocSinh.toString().padStart(3, '0')}`;
}

function themHocSinh(hoTen, lopHoc, diemTB, hanhKiem) {
  const ma = sinhMaHocSinh();
  const hocSinhMoi = new HocSinh(ma, hoTen, lopHoc, diemTB, hanhKiem);
  danhSachHocSinh.push(hocSinhMoi);
  console.log(`Thêm thành công: ${hoTen} (${ma})`);
}

function timHocSinh(ma) {
  return danhSachHocSinh.find(hs => hs.ma === ma) || null;
}

function capNhatHocSinh(ma, thongTin) {
  const index = danhSachHocSinh.findIndex(hs => hs.ma === ma);
  if (index !== -1) {
   
    danhSachHocSinh[index] = { ...danhSachHocSinh[index], ...thongTin };
    console.log(`Cập nhật thành công mã ${ma}`);
  } else {
    console.log(`Không tìm thấy mã học sinh ${ma}`);
  }
}


function xoaHocSinh(ma) {
  const index = danhSachHocSinh.findIndex(hs => hs.ma === ma);
  if (index !== -1) {
    danhSachHocSinh.splice(index, 1);
    console.log(`Xoá thành công mã ${ma}`);
  } else {
    console.log(`Không tìm thấy mã học sinh ${ma}`);
  }
}
function layDanhSachLop(lop) {
  return danhSachHocSinh.filter(hs => hs.lopHoc === lop);
}
function phanLoaiHocSinh() {
  const phanLoai = {
    XuatSac: [],
    Gioi: [],
    Kha: [],
    TrungBinh: [],
    Kem: []
  };
  danhSachHocSinh.forEach(hs => {
    const { diemTB } = hs;
    if (diemTB >= 9.0) phanLoai.XuatSac.push(hs);
    else if (diemTB >= 8.0) phanLoai.Gioi.push(hs);
    else if (diemTB >= 6.5) phanLoai.Kha.push(hs);
    else if (diemTB >= 5.0) phanLoai.TrungBinh.push(hs);
    else phanLoai.Kem.push(hs);
  });
  return phanLoai;
}

function sapXepTheoDiemTB(lop = null) {
  const ds = lop ? layDanhSachLop(lop) : [...danhSachHocSinh];
  return ds.slice().sort((a, b) => b.diemTB - a.diemTB);
}


themHocSinh("Phú Tài C", "10A1", 7.8, "Khá");
console.log('Danh sách sau khi thêm:', danhSachHocSinh);

const timHS = timHocSinh("ma2023100");
console.log('Tìm học sinh:', timHS);

capNhatHocSinh("ma2023100", { diemTB: 9.1, hanhKiem: "Tốt" });
console.log('Sau cập nhật:', timHocSinh("ma2023100"));

xoaHocSinh("ma2023101");
console.log('Danh sách sau khi xoá:', danhSachHocSinh);

console.log('Danh sách lớp 10A1:', layDanhSachLop("10A1"));

console.log('Phân loại học sinh:', phanLoaiHocSinh());

console.log('Xếp hạng theo điểm trung bình:', sapXepTheoDiemTB());