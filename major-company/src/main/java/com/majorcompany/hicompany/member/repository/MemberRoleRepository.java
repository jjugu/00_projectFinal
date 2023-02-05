package com.majorcompany.hicompany.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.majorcompany.hicompany.member.entity.MemberRole;
import com.majorcompany.hicompany.member.entity.MemberRolePk;

public interface MemberRoleRepository extends JpaRepository<MemberRole, MemberRolePk>{

}
