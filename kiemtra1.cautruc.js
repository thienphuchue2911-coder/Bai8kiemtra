class HocSinh {
  constructor(ma, hoTen, lopHoc, diemTB, hanhKiem) {
    this.ma = ma;
    this.hoTen = hoTen;
    this.lopHoc = lopHoc;
    this.diemTB = diemTB;
    this.hanhKiem = hanhKiem;
  }
}

const danhSachHocSinh = [];

const currentYear = new Date().getFullYear();
let soLuongHocSinh = 0;

function capMaHocSinh() {
  soLuongHocSinh += 1;
  const ma = `ma${currentYear}${soLuongHocSinh.toString().padStart(3, '0')}`;
  return ma;
}
function themHocSinh(hoTen, lopHoc, diemTB, hanhKiem) {
  const ma = capMaHocSinh();
  const hocSinh = new HocSinh(ma, hoTen, lopHoc, diemTB, hanhKiem);
  danhSachHocSinh.push(hocSinh);
  console.log(`Thêm học sinh thành công: ${hoTen} - Mã: ${ma}`);
}


function timHocSinhTheoMa(ma) {
  return danhSachHocSinh.find(hs => hs.ma === ma) || null;
}

function capNhatHocSinh(ma, thongTinCapNhat) {
  const hs = timHocSinhTheoMa(ma);
  if (hs) {
    Object.assign(hs, thongTinCapNhat);
    console.log(`Cập nhật thành công học sinh mã: ${ma}`);
  } else {
    console.log(`Không tìm thấy học sinh mã: ${ma}`);
  }
}
function xoaHocSinh(ma) {
  const index = danhSachHocSinh.findIndex(hs => hs.ma === ma);
  if (index !== -1) {
    danhSachHocSinh.splice(index, 1);
    console.log(`Xoá học sinh mã: ${ma} thành công`);
  } else {
    console.log(`Không tìm thấy học sinh mã: ${ma}`);
  }
}

function layDanhSachLop(lop) {
  return danhSachHocSinh.filter(hs => hs.lopHoc === lop);
}

function phanLoaiHocSinh() {
  const ketQua = {
    XuatSac: [],
    Gioi: [],
    Kha: [],
    TrungBinh: [],
    Kem: []
  };

  danhSachHocSinh.forEach(hs => {
    if (hs.diemTB >= 9.0) {
      ketQua.XuatSac.push(hs);
    } else if (hs.diemTB >= 8.0) {
      ketQua.Gioi.push(hs);
    } else if (hs.diemTB >= 6.5) {
      ketQua.Kha.push(hs);
    } else if (hs.diemTB >= 5.0) {
      ketQua.TrungBinh.push(hs);
    } else {
      ketQua.Kem.push(hs);
    }
  });

  return ketQua;
}

function sapXepTheoDiemTB(lop = null) {
  let ds = [...danhSachHocSinh];
  if (lop) {
    ds = layDanhSachLop(lop);
  }
  return ds.sort((a, b) => b.diemTB - a.diemTB);
}

themHocSinh('Hoàng Đức A', '10A1', 9.5, 'Tốt');
themHocSinh('Phú tài B', '10A2', 8.2, 'Khá');
themHocSinh('Thiên Phúc C', '10A1', 7.1, 'Khá');

console.log('Danh sách học sinh:', danhSachHocSinh);

const timHS = timHocSinhTheoMa('ma202300100');
console.log('Tìm học sinh:', timHS);

capNhatHocSinh('ma202300100', {diemTB: 9.1, hanhKiem: 'Tốt'});
console.log('Sau cập nhật:', timHocSinhTheoMa('ma202300100'));

xoaHocSinh('ma202300102');
console.log('Danh sách sau khi xoá:', danhSachHocSinh);

console.log('Danh sách lớp 10A1:', layDanhSachLop('10A1'));

console.log('Phân loại học sinh:', phanLoaiHocSinh());

console.log('Xếp hạng theo điểm trung bình:', sapXepTheoDiemTB());