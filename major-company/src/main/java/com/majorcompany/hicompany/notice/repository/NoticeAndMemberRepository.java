package com.majorcompany.hicompany.notice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.majorcompany.hicompany.notice.entity.NoticeAndMember;

public interface NoticeAndMemberRepository extends JpaRepository<NoticeAndMember, Integer>{
	
}
