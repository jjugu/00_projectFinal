package com.majorcompany.hicompany.leaveapp.service;

import java.text.SimpleDateFormat;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.majorcompany.hicompany.common.Criteria;
import com.majorcompany.hicompany.leaveapp.dto.LeaveAppAndMemberDTO;
import com.majorcompany.hicompany.leaveapp.dto.LeaveAppDTO;
import com.majorcompany.hicompany.leaveapp.entity.LeaveApp;
import com.majorcompany.hicompany.leaveapp.entity.LeaveAppAndMember;
import com.majorcompany.hicompany.leaveapp.repository.LeaveAppAndMemberRepository;
import com.majorcompany.hicompany.leaveapp.repository.LeaveAppRepository;
import com.majorcompany.hicompany.member.entity.Member;
import com.majorcompany.hicompany.member.repository.MemberRepository;

@Service
public class LeaveAppService {

	private static final Logger log = LoggerFactory.getLogger(LeaveAppService.class);
	private final LeaveAppAndMemberRepository leaveAppAndMemberRepository;
	private final LeaveAppRepository leaveAppRepository;
	private final MemberRepository memberRepository;
	private final ModelMapper modelMapper;
	
	@Autowired
	public LeaveAppService(LeaveAppAndMemberRepository leaveAppAndMemberRepository,
			LeaveAppRepository leaveAppRepository, ModelMapper modelMapper, MemberRepository memberRepository) {
		this.leaveAppAndMemberRepository = leaveAppAndMemberRepository;
		this.leaveAppRepository = leaveAppRepository;
		this.memberRepository = memberRepository;
		this.modelMapper = modelMapper;
	}

	/* 기안서 작성 */
	@Transactional
	public Object insertLeaveApp(LeaveAppDTO leaveAppDTO) {
		log.info("[LeaveAppService] insertLeaveApp Start ==============================");
	    log.info("[LeaveAppService] leaveAppDTO : " + leaveAppDTO);
		int result = 0;
		
		java.util.Date now = new java.util.Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yy/MM/dd HH:mm:ss");
		String reaveappDate = sdf.format(now);
		leaveAppDTO.setLeaveappDate(reaveappDate);
		
		try {
			LeaveApp leaveApp = modelMapper.map(leaveAppDTO, LeaveApp.class);
			
			leaveAppRepository.save(leaveApp);
			
			result = 1;
		} catch (Exception e) {
			log.info("[leaveApp insert] Exception!!");
		}
		
		log.info("[LeaveAppService] insertLeaveApp End ==============================");
		
		return (result > 0) ? "결재 기안 성공" : "결재 기안 실패";
	}

	// 기안자가 보는 기안서 목록 총 개수(상태값 N 또는 Y 일때)
	public int selectLeaveAppMemberCodeTotal(String memberCode) {
		log.info("[LeaveAppService] selectLeaveAppTotal Start ===================================");
		
		int result = leaveAppRepository.countByMemberCodeAndLeaveappStatusLikeOrMemberCodeAndLeaveappStatusLike(Long.valueOf(memberCode), 'N', Long.valueOf(memberCode), 'Y');

        log.info("[LeaveAppService] selectLeaveAppTotal End ===================================");
        
        return result;
	}

	// 결재자1이 보는 기안서 목록 총 개수(상태값 N 일때)
	public int selectLeaveAppMemberCode1Total(String memberCode) {
		log.info("[LeaveAppService] selectLeaveAppTotal Start ===================================");
		
		int result = leaveAppRepository.countByMemberCode1AndLeaveappStatus(Long.valueOf(memberCode), 'N');
		
        log.info("[LeaveAppService] selectLeaveAppTotal End ===================================");
        
        return result;
	}
	
	// 결재자2가 보는 기안서 목록 총 개수(상태값 O일때)
	public int selectLeaveAppMemberCode2Total(String memberCode) {
		log.info("[LeaveAppService] selectLeaveAppTotal Start ===================================");
		
		int result = leaveAppRepository.countByMemberCode2AndLeaveappStatus(Long.valueOf(memberCode), 'O');
		
        log.info("[LeaveAppService] selectLeaveAppTotal End ===================================");
        
        return result;
	}
	
	// leaveApp의 memberCode와 로그인 한 사람의 memberCode가 같을 때
	public Object selectLeaveAppMemberCodeWithPaging(Criteria cri, String memberCode) {
		log.info("[LeaveAppService] selectLeaveAppWithPaging Start ===================================");

		int index = cri.getPageNum() - 1;
		int count = cri.getAmount(); 
		Pageable paging = PageRequest.of(index, count, Sort.by("leaveappNo").descending());
		
		Member member = memberRepository.findById(Long.valueOf(memberCode)).get();
		
		Page<LeaveAppAndMember> result = leaveAppAndMemberRepository.findByMemberCodeAndLeaveappStatusLikeOrMemberCodeAndLeaveappStatusLike(member, 'N' , member, 'Y', paging);
		List<LeaveAppAndMember> leaveAppList = (List<LeaveAppAndMember>)result.getContent();
		
		log.info("[LeaveAppService] selectLeaveAppWithPaging End ===================================");
		
		return leaveAppList.stream().map(leaveApp -> modelMapper.map(leaveApp, LeaveAppAndMemberDTO.class)).collect(Collectors.toList());
	}
	
	// leaveApp의 memberCode1와 로그인 한 사람의 memberCode가 같을 때
	public Object selectLeaveAppMemberCode1WithPaging(Criteria cri, String memberCode) {
		log.info("[LeaveAppService] selectLeaveAppWithPaging Start ===================================");

		int index = cri.getPageNum() - 1;
		int count = cri.getAmount(); 
		Pageable paging = PageRequest.of(index, count, Sort.by("leaveappNo").descending());
		
		Member member = memberRepository.findById(Long.valueOf(memberCode)).get();
		
		Page<LeaveAppAndMember> result = leaveAppAndMemberRepository.findByMemberCode1AndLeaveappStatus(member, 'N', paging);
		List<LeaveAppAndMember> leaveAppList = (List<LeaveAppAndMember>)result.getContent();
		
		log.info("[LeaveAppService] selectLeaveAppWithPaging End ===================================");
		
		return leaveAppList.stream().map(leaveApp -> modelMapper.map(leaveApp, LeaveAppAndMemberDTO.class)).collect(Collectors.toList());
	}
	
	// leaveApp의 memberCode2와 로그인 한 사람의 memberCode가 같을 때
	public Object selectLeaveAppMemberCode2WithPaging(Criteria cri, String memberCode) {
		log.info("[LeaveAppService] selectLeaveAppWithPaging Start ===================================");

		int index = cri.getPageNum() - 1;
		int count = cri.getAmount(); 
		Pageable paging = PageRequest.of(index, count, Sort.by("leaveappNo").descending());
		
		Member member = memberRepository.findById(Long.valueOf(memberCode)).get();
		
		Page<LeaveAppAndMember> result = leaveAppAndMemberRepository.findByMemberCode2AndLeaveappStatus(member, 'O', paging);
		List<LeaveAppAndMember> leaveAppList = (List<LeaveAppAndMember>)result.getContent();
		
		log.info("[LeaveAppService] selectLeaveAppWithPaging End ===================================");
		
		return leaveAppList.stream().map(leaveApp -> modelMapper.map(leaveApp, LeaveAppAndMemberDTO.class)).collect(Collectors.toList());
	}
	
	// 휴가 기안 승인 및 기안서 수정
	@Transactional
	public Object updateLeaveApp(LeaveAppDTO leaveAppDTO) {
		log.info("[LeaveAppService] updateLeaveApp Start ==============================");
		log.info("홀리데이계산해보자", leaveAppDTO.getHoliday());
		int result = 0;

		try {
			if(leaveAppDTO.getLeaveappStatus() == 'Y') {
				LeaveApp leaveApp = leaveAppRepository.findById(leaveAppDTO.getLeaveappNo()).get();
				Member member = memberRepository.findById(leaveAppDTO.getMemberCode()).get();
				member.setMemberRemanet(member.getMemberRemanet() - leaveAppDTO.getHoliday());
				
				java.util.Date now = new java.util.Date();
				SimpleDateFormat sdf = new SimpleDateFormat("yy/MM/dd HH:mm:ss");
				String reaveappDate = sdf.format(now);
				
				log.info("★★★★★[LeaveAppService]){}", member);
				log.info("★★★★★[LeaveAppService]){}", leaveApp);
				leaveApp.setLeaveappTitle(leaveAppDTO.getLeaveappTitle());
				leaveApp.setLeaveappContent(leaveAppDTO.getLeaveappContent());
				leaveApp.setLeaveappStatus(leaveAppDTO.getLeaveappStatus());
				leaveApp.setReportlineDate(reaveappDate);
			} else {
				LeaveApp leaveApp = leaveAppRepository.findById(leaveAppDTO.getLeaveappNo()).get();
				log.info("★★★★★[LeaveAppService]){}", leaveApp);
				leaveApp.setLeaveappTitle(leaveAppDTO.getLeaveappTitle());
				leaveApp.setLeaveappContent(leaveAppDTO.getLeaveappContent());
				leaveApp.setLeaveappStatus(leaveAppDTO.getLeaveappStatus());
				leaveApp.setReportlineDate(leaveAppDTO.getReportlineDate());
			}

			result = 1;
		} catch (Exception e) {
			log.info("[LeaveAppService update] Exception!!");
		}
		
		log.info("[LeaveAppService] updateLeaveApp End ==============================");
		
		return (result > 0) ? "휴가 기안서 승인 성공" : "휴가 기안서 승인 실패" ;
	}
	
	// 기안서 번호로 조회하는 기안서 세부정보
	public Object selectLeaveAppDetail(int leaveappNo) {
		log.info("[LeaveAppService] getReviewDetail Start ==============================");
		
		LeaveAppAndMember leaveApp = leaveAppAndMemberRepository.findById(leaveappNo).get();
		
        log.info("[LeaveAppService] getReviewDetail End ==============================");
        
        return modelMapper.map(leaveApp, LeaveAppAndMemberDTO.class);
	}

	
}
