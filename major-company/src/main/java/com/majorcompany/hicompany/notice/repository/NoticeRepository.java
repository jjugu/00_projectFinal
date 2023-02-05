package com.majorcompany.hicompany.notice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.majorcompany.hicompany.notice.entity.Notice;

public interface NoticeRepository extends JpaRepository<Notice, Integer> {


}
