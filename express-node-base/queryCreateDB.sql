create table sinhvien
(
    masv       uuid not null
        constraint sinhvien_pk
            primary key,
    hosv       varchar,
    tensv      varchar,
    gioitinh   integer,
    ngaysinh   varchar,
    noisinh    varchar,
    diachi     varchar,
    matinh     varchar,
    maquan     varchar,
    malop      uuid,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now(),
    deleted_at timestamp
);

create table lop
(
    malop      uuid not null
        constraint lop_pk
            primary key,
    tenlop     varchar,
    manganh    varchar,
    makhoahoc  varchar,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now(),
    deleted_at timestamp
);

create table bangdiemthihocky
(
    masv       uuid,
    mamonhoc   varchar,
    lanthi     integer                  default 0,
    hocky      integer                  default 0,
    diem       double precision         default 0,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

create table monhoc
(
    mamonhoc   varchar not null
        constraint monhoc_pk
            primary key,
    tenmonhoc  varchar,
    lythuyet   varchar,
    thuchanh   varchar,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);
