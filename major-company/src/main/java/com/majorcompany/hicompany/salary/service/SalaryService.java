package com.majorcompany.hicompany.salary.service;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.majorcompany.hicompany.exception.MemberEntPutFailedException;
import com.majorcompany.hicompany.exception.RtPaymentInsertFailedException;
import com.majorcompany.hicompany.exception.RtStatusPutFailedException;
import com.majorcompany.hicompany.exception.SalaryGiveInsertFailedException;
import com.majorcompany.hicompany.member.dto.MemberDTO;
import com.majorcompany.hicompany.member.entity.Member;
import com.majorcompany.hicompany.member.repository.MemberRepository;
import com.majorcompany.hicompany.salary.dto.MemberAndSalaryDTO;
import com.majorcompany.hicompany.salary.dto.SalaryDTO;
import com.majorcompany.hicompany.salary.entity.MemberAndSalary;
import com.majorcompany.hicompany.salary.entity.Salary;
import com.majorcompany.hicompany.salary.repository.MemberAndSalaryRepository;
import com.majorcompany.hicompany.salary.repository.SalaryRepository;

@Service
public class SalaryService {

	
	private static final Logger log = LoggerFactory.getLogger(SalaryService.class);
	private final MemberRepository memberRepository;
	private final SalaryRepository salaryRepository;
	private final MemberAndSalaryRepository memberAndSalaryRepository;
	private final ModelMapper modelMapper;
	
	public SalaryService(MemberRepository memberRepository, SalaryRepository salaryRepository
					   , MemberAndSalaryRepository memberAndSalaryRepository, ModelMapper modelMapper) {
		this.memberRepository = memberRepository;
		this.salaryRepository = salaryRepository;
		this.memberAndSalaryRepository =  memberAndSalaryRepository;
		this.modelMapper = modelMapper;
	}

	/* 전체 사원의 급여 목록 조회 */
	public List<SalaryDTO> selectSalaryList() {
		log.info("[SalaryService] salaryList Start ==============================");
		
		List<Salary> salaryList = salaryRepository.findAll();
		
		log.info("[SalaryService] salaryList {}", salaryList);
		
		log.info("[SalaryService] selectSalaryList End ==========================");
		
		return salaryList.stream().map(salary -> modelMapper.map(salary, SalaryDTO.class)).collect(Collectors.toList());
	}
	
	/* 급여가 포함된 전체 사원 목록 조회 */
	public List<MemberAndSalaryDTO> getAllMemberSalaryList() {
		log.info("[SalaryService] memberAndSalaryList Start =====================");
		
		List<MemberAndSalary> memberAndSalary = memberAndSalaryRepository.findAll();
		
		log.info("[SalaryService] memberAndSalary: {}", memberAndSalary);
		
		log.info("[SalaryService] memberAndSalaryList End =======================");
		
		return memberAndSalary.stream().map(member -> modelMapper.map(member, MemberAndSalaryDTO.class)).collect(Collectors.toList());
	}
	
	/* 특정 사원의 급여 목록 조회 */
	public MemberAndSalaryDTO selectMemberSalary(String memberId) {
		log.info("[SalaryService] memberSalary Start ============================");
		Member selectMember = memberRepository.findMemberCodeByMemberId(memberId);
		log.info("[SalaryService] selectMember: {}",  selectMember);
		
		MemberAndSalary salary = memberAndSalaryRepository.findByMemberCode(selectMember.getMemberCode());
		log.info("[SalaryService] salary : {}", salary);
		
		log.info("[SalaryService] memberSalary End ==============================");
		
		return modelMapper.map(salary, MemberAndSalaryDTO.class);
	}
	
	/* 특정 사원의 급여 목록 조회 - memberCode.ver */
	public MemberAndSalaryDTO selectMemberSalaryList(String memberId) {
		log.info("[SalaryService] selectMemberSalaryList Start ============================");
		Member selectMember = memberRepository.findMemberCodeByMemberId(memberId);
		log.info("[SalaryService] selectMember: {}",  selectMember);
		
		MemberAndSalary salary = memberAndSalaryRepository.findByMemberCode(selectMember.getMemberCode());
		log.info("[SalaryService] salary : {}", salary);
		
		log.info("[SalaryService] selectMemberSalaryList End ==============================");
		
		return modelMapper.map(salary, MemberAndSalaryDTO.class);
	}

	/* 해당 사원 급여 요청 */
	@Transactional
	public Object insertGiveSalary(SalaryDTO salaryDTO) {
		log.info("[SalaryService] insertGiveSalary Start =========================");
		log.info("[SalaryService] salaryDTO : {}", salaryDTO);
		
		MemberAndSalary member = memberAndSalaryRepository.findByMemberCode(salaryDTO.getMemberCode());
//		log.info("[member에서 salary배열 하나씩 꺼내기] : {}", member.getMemberSalary().get(2));
		
		Salary salary = modelMapper.map(salaryDTO, Salary.class);
		salary.setMemberCode(salaryDTO.getMemberCode());
		log.info(salary.toString());
		
		int result = 0;
		
		try {
	
			/* 이번 달 구하기 */
			SimpleDateFormat sdf = new SimpleDateFormat("MM월");
			Calendar cal = Calendar.getInstance();
			cal.setTime(new Date());
//			cal.add(Calendar.MONTH, 1);
			
			String thisMonth = sdf.format(cal.getTime());
			log.info(thisMonth);
			
			/* 급여 지급 년도 구하기 */
			SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy년");
			String thisYear = sdf1.format(cal.getTime());
			log.info(thisYear);
			
			salary.setSalaryMonth(thisMonth);
			salary.setSalaryYear(thisYear);
			
			/* 급여 해당 월 중복 여부 */
			for(int i = 0; i < member.getMemberSalary().size(); i++) {
				if(member.getMemberSalary().get(i).getSalaryMonth().equals(salary.getSalaryMonth())
						&& member.getMemberSalary().get(i).getSalaryYear().equals(salary.getSalaryYear())
						&& member.getMemberSalary().get(i).getMemberCode().equals(salary.getMemberCode())) {
					log.info("[SalaryService]  {}", "해당 월 급여 요청이 이미 완료되었습니다.");
					throw new SalaryGiveInsertFailedException("해당 월 급여 요청이 이미 완료되었습니다.");
				}
			}			
			
			/* 기본 지급 여부 : N */
			salary.setSalaryStatus("N");
			
			salaryRepository.save(salary);
			
			result = 1;
		} catch(Exception e) {
			log.info("[SalaryService] insertGiveSalary Exception!!");
		}
		
		log.info("[SalaryService] insertGiveSalary End =============================");
		
		return (result > 0) ? "급여 요청 성공" : "급여 요청 실패";
	}

	/* 급여 요청된 사원 급여 지급 승인 */
	@Transactional
	public Object okayGiveSalary(SalaryDTO salaryDTO) {
		log.info("[SalaryService] okayGiveSalary Start ==============================");
		log.info("[SalaryService] salaryDTO : {}", salaryDTO);
		
		int result = 0;
		
		try {
			Salary salary = salaryRepository.findBySalaryCode(salaryDTO.getSalaryCode());
			salary.setSalaryStatus("Y");
			
			log.info("[salaryService] salary : {}", salary);
			result = 1;
		} catch (Exception e) {
			log.info("[salary okay] Exception!!");
		}
		
		log.info("[SalaryService] okayGiveSalary End ==============================");
		
		return (result > 0) ? "급여 승인 성공" : "급여 승인 실패" ;
	}

	/* 급여 요청된 사원 급여 지급 반려 */
	@Transactional
	public Object rejectGiveSalary(SalaryDTO salaryDTO) {
		log.info("[SalaryService] rejectGiveSalary Start =============================");
		log.info("[SalaryService] salaryDTO : {} ", salaryDTO);
		
		int result = 0;
		
		try {
			Salary salary = salaryRepository.findBySalaryCode(salaryDTO.getSalaryCode());
			salary.setSalaryRejectReason(salaryDTO.getSalaryRejectReason());
			salary.setSalaryStatus("R");
			
			log.info("[SalaryService] salary : {} ", salary);
			
			salaryRepository.save(salary);
			result = 1;
		} catch(Exception e) { 
			log.info("[Salary Reject] Exception!!");
		}
		
		log.info("[SalaryService] rejectGiveSalary End ================================");
		
		return (result > 0) ? "급여 반려 성공" : "급여 반려 실패";
	}

	/* 반려된 급여 지급 요청 수정 및 재요청 */
	@Transactional
	public Object reRequestSalary(SalaryDTO salaryDTO) {
		log.info("[SalaryService] reRequestSalary Start =============================");
		log.info("[SalaryService] salaryDTO : {} ", salaryDTO);
		
		int result = 0; 
		
		try { 
			
			Salary salary = salaryRepository.findBySalaryCode(salaryDTO.getSalaryCode());
			
			/* 기본 지급 여부 : N */
			salary.setSalaryStatus("N");
			
			salary.setSalaryRejectReason("");
			
			salaryRepository.save(salary);
			
			result = 1;
		} catch(Exception e) {
			log.info("[SalaryService] reRequestSalary Exception!!");
		}
		
		log.info("[SalaryService] reRequestSalary End =============================");
		
		return (result > 0) ? "급여 재요청 성공" : "급여 재요청 실패";
	}

	/* 급여가 포함된 전체 사원 목록 조회 - 퇴사자 기준 */
	public List<MemberAndSalaryDTO> getAllRetiredMemberSalaryList() {
		log.info("[SalaryService] getAllRetiredMemberSalaryList Start =====================");
		List<MemberAndSalary> memberWho = memberAndSalaryRepository.findMemberByMemberEnt('Y');
		
		log.info(memberWho.toString());
		
		log.info("[SalaryService] retiredList: {}", memberWho);
		
		log.info("[SalaryService] getAllRetiredMemberSalaryList End =======================");
		
		return memberWho.stream().map(member -> modelMapper.map(member, MemberAndSalaryDTO.class)).collect(Collectors.toList());
	}
	
	/* 퇴직금 지금 대상 찾기 */
	public Object getRetiredMember(String memberId) {
		
		log.info("[SalaryService] getRetiredMember Start ============================");
		Member selectMember = memberRepository.findMemberCodeByMemberId(memberId);
		log.info("[SalaryService] selectMember: {}",  selectMember);
		
		MemberAndSalary salary = memberAndSalaryRepository.findByMemberCode(selectMember.getMemberCode());
		log.info("[SalaryService] salary : {}", salary);
		
		log.info("[SalaryService] getRetiredMember End ==============================");
		
		return modelMapper.map(salary, MemberAndSalaryDTO.class);
	}

	/* 해당 퇴사자에게 퇴직금 지급 요청 */
	@Transactional
	public Object insertGiveRetirementPay(MemberAndSalaryDTO memberAndSalaryDTO) {
		log.info("[SalaryService] insertGiveRetirementPay Start =====================");
		log.info("[SalaryService] memberAndSalaryDTO : {} ", memberAndSalaryDTO);
		
		long zero = 0;
		int result = 0; 
		
		try { 
			MemberAndSalary retiredPay = memberAndSalaryRepository.findByMemberCode(memberAndSalaryDTO.getMemberCode());
			
			if(retiredPay.getMemberRtPayment() == null) { 
				retiredPay.setMemberRtPayment(zero);
				log.info("[SalaryService] retiredPay.getMemberRtPayment() : {} ", retiredPay.getMemberRtPayment());
			}
			
			/* 퇴직금 지급 중복 여부 */
			if(retiredPay.getMemberRtPayment() != 0 ) {
				log.info("[SalaryService]  {}", "퇴사자의 퇴직금 요청이 이미 완료되었습니다.");
				throw new RtPaymentInsertFailedException("퇴사자의 퇴직금 요청이 이미 완료되었습니다.");
			};
			
			retiredPay.setMemberRtPayment(memberAndSalaryDTO.getMemberRtPayment());
			
			
			memberAndSalaryRepository.save(retiredPay);
			log.info("[SalaryService] salary : {} ", retiredPay);
			
			result = 1;
		} catch(Exception e) {
			log.info("[SalaryService] reRequestSalary Exception!!");
		}
		
		log.info("[SalaryService] insertGiveRetirementPay End =======================");
		return (result > 0) ? "퇴직금 요청 성공" : "퇴직금 요청 실패";
	}

	/* 퇴직금 요청된 사원에게 퇴직금 지급 승인 */
	@Transactional
	public Object okayGiveRetirePay(MemberDTO memberDTO) {
		log.info("[SalaryService] okayGiveRetirePay Start ==============================");
		log.info("[SalaryService] memberDTO : {}", memberDTO);
		
		int result = 0;
		
		try {
			MemberAndSalary retiredPay = memberAndSalaryRepository.findByMemberCode(memberDTO.getMemberCode());
			log.info("[SalaryService] retiredPay before : {}", retiredPay);
			
			/* 퇴직금 지급 승인 여부 */
			if(retiredPay.getMemberRtStatus() == "Y" ) {
				log.info("[SalaryService]  {}", "퇴사자의 퇴직금 승인이 이미 완료되었습니다.");
				throw new RtStatusPutFailedException("퇴사자의 퇴직금 승인이 이미 완료되었습니다.");
			};
			
			retiredPay.setMemberRtStatus("Y");
			memberAndSalaryRepository.save(retiredPay);
			
			log.info("[salaryService] salary : {}", retiredPay);
			result = 1;
		} catch (Exception e) {
			log.info("[salary okay] Exception!!");
		}
		
		log.info("[SalaryService] okayGiveRetirePay End ==============================");
		
		return (result > 0) ? "퇴직금 지급 승인 성공" : "퇴직금 지급 승인 실패" ;
	}

	/* 해당 사원 퇴사 처리 */
	@Transactional
	public Object retiredMember(MemberDTO memberDTO) {
		log.info("[SalaryService] retiredMember Start ==============================");
		log.info("[SalaryService] memberDTO : {}", memberDTO);
		
		int result = 0;
		
		try {
			MemberAndSalary retiredMember = memberAndSalaryRepository.findByMemberCode(memberDTO.getMemberCode());
			
			/* 퇴직금 지급 승인 여부 */
			if(retiredMember.getMemberEnt() == 'Y' ) {
				log.info("[SalaryService]  {}", "해당 사원의 퇴사 처리가 이미 완료되었습니다.");
				throw new MemberEntPutFailedException("해당 사원의 퇴사 처리가 이미 완료되었습니다.");
			};
			
			retiredMember.setMemberEnt('Y');
			retiredMember.setMemberLeave(memberDTO.getMemberLeave().toString());
			memberAndSalaryRepository.save(retiredMember);
			
			log.info("[salaryService] retiredMember : {}", retiredMember);
			result = 1;
		} catch (Exception e) {
			log.info("[salary okay] Exception!!");
		}
		
		log.info("[SalaryService] retiredMember End ==============================");
		
		return (result > 0) ? "퇴사 처리 성공" : "퇴사 처리 실패" ;
	}

	/* 퇴사 처리되었던 직원을 재직으로 변경 */
	@Transactional
	public Object cancelRetired(MemberDTO memberDTO) {
		log.info("[SalaryService] cancelRetired Start ==============================");
		log.info("[SalaryService] memberDTO : {}", memberDTO);
		
		int result = 0;
		
		try {
			MemberAndSalary retiredMemberCancel = memberAndSalaryRepository.findByMemberCode(memberDTO.getMemberCode());
			
			/* 퇴사 처리 취소 여부 */
			if(retiredMemberCancel.getMemberEnt() == 'N' ) {
				log.info("[SalaryService]  {}", "해당 사원의 퇴사 취소 처리가 이미 완료되었습니다.");
				throw new MemberEntPutFailedException("해당 사원의 퇴사 취소 처리가 이미 완료되었습니다.");
			};
			
			retiredMemberCancel.setMemberEnt('N');
			retiredMemberCancel.setMemberLeave(memberDTO.getMemberLeave().toString());
			retiredMemberCancel.setMemberRtStatus("N");
			retiredMemberCancel.setMemberRtPayment(memberDTO.getMemberRtPayment());
			memberAndSalaryRepository.save(retiredMemberCancel);
			
			log.info("[salaryService] retiredMember : {}", retiredMemberCancel);
			result = 1;
		} catch (Exception e) {
			log.info("[salary okay] Exception!!");
		}
		
		log.info("[SalaryService] cancelRetired End ==============================");
		
		return (result > 0) ? "퇴사 취소 처리 성공" : "퇴사 취소 처리 실패" ;
	}
	
}

















