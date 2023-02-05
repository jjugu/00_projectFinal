package com.majorcompany.hicompany.attendance.service;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.majorcompany.hicompany.attendance.dto.AttendanceAndMemberDTO;
import com.majorcompany.hicompany.attendance.dto.AttendanceDTO;
import com.majorcompany.hicompany.attendance.dto.MemberAndAttendanceDTO;
import com.majorcompany.hicompany.attendance.entity.Attendance;
import com.majorcompany.hicompany.attendance.entity.AttendanceAndMember;
import com.majorcompany.hicompany.attendance.entity.MemberAndAttendance;
import com.majorcompany.hicompany.attendance.repository.AttendanceAndMemberRepository;
import com.majorcompany.hicompany.attendance.repository.AttendanceRepository;
import com.majorcompany.hicompany.attendance.repository.MemberAndAttendanceRepository;
import com.majorcompany.hicompany.exception.AttendanceInsertFailedException;
import com.majorcompany.hicompany.exception.AttendanceUpdateFailedException;
import com.majorcompany.hicompany.member.entity.Member;
import com.majorcompany.hicompany.member.repository.MemberRepository;

@Service
public class AttendanceService {

	private static final Logger log = LoggerFactory.getLogger(AttendanceService.class);
	private final ModelMapper modelMapper;
	private final AttendanceRepository attendanceRepository;
	private final AttendanceAndMemberRepository attendanceAndMemberRepository;
	private final MemberAndAttendanceRepository memberAndAttendanceRepository;
	private final MemberRepository memberRepository;
	
	@Autowired
	public AttendanceService(ModelMapper modelMapper, AttendanceRepository attendanceRepository, AttendanceAndMemberRepository attendanceAndMemberRepository
						   , MemberRepository memberRepository, MemberAndAttendanceRepository memberAndAttendanceRepository) {
		this.modelMapper = modelMapper;
		this.attendanceRepository = attendanceRepository;
		this.attendanceAndMemberRepository = attendanceAndMemberRepository;
		this.memberAndAttendanceRepository = memberAndAttendanceRepository;
		this.memberRepository = memberRepository;
	}
	
	/* 사원별 출퇴 select */
	public Object selectEmpAttendanceList(String memberId) {
		
		log.info("[AttendanceService] selectEmpAttendanceList Start ==============================");
		
		Member memberCode = memberRepository.findMemberCodeByMemberId(memberId);	
		log.info("memberCode: {} " , memberCode);
        List<MemberAndAttendance> empAttendanceList = memberAndAttendanceRepository.findByMemberCode(memberCode.getMemberCode());
        
        log.info("[AttendanceService] empAttendanceList {}", empAttendanceList);

        log.info("[AttendanceService] selectEmpAttendanceList End ==============================");
        
        return empAttendanceList.stream().map(attendance -> modelMapper.map(attendance, MemberAndAttendanceDTO.class)).collect(Collectors.toList());
	}
	
	/* 출근 create => if문까지 test 완료 */
	/*
	 * insert 정보 : 출근 시각 == 퇴근시각, 사번, 출근일자
	 * : 출근 및 퇴근 = 현재 날짜 > 퇴근 버튼을 누르지 않을 경우 : 근무시간 0으로 출석 인정 x
	 * : if case 1) 지각 처리
	 * : if case 2) 퇴사자 처리
	 * : if case 3) 같은 날 출근 일자가 두 개 > 이미 출석 완료 되었습니다. (==으로 출근 일자 비교)
	 */
	@Transactional
	public Object insertAttendance(MemberAndAttendanceDTO memberAndAttendanceDTO, AttendanceDTO attendanceDTO) {
		log.info("[AttendanceService] insertAttendance Start ==============================");
	
		MemberAndAttendance member = memberAndAttendanceRepository.findMemberByMemberId(memberAndAttendanceDTO.getMemberId());
	    
		int result = 0;
	    
	    try {
	    	Attendance attendance = modelMapper.map(attendanceDTO, Attendance.class);
	    	attendance.setMemberCode(member.getMemberCode());
	    	
	    	/* 출근 시각, 퇴근 시각 */
	    	java.util.Date now = new java.util.Date();
	    	SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.KOREA);
	    	SimpleDateFormat sdf2 = new SimpleDateFormat("yyyy-MM-dd'T'09:00:00.000'Z'", Locale.KOREA);
	    	
			String attendanceStart = sdf1.format(now);
			String rull = sdf2.format(now);
			
			log.info(attendanceStart);
			log.info(rull);
			
			LocalDateTime startDate = null;
			LocalDateTime rullTime = null;
			DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.KOREA);
			startDate = LocalDateTime.parse(attendanceStart, dateTimeFormatter);
			log.info(startDate.toString());
			rullTime = LocalDateTime.parse(rull, dateTimeFormatter);
			log.info(rullTime.toString());
			
	    	attendance.setTitle("출근");
	    	attendance.setStart(startDate);
	    	attendance.setEnd(startDate);
	    	
	    	/* if case 1 : 지각 처리 */
	    	boolean how = rullTime.isBefore(startDate);
	    	if (how == true) {
	    		attendance.setTitle("지각");
	    	}

	    	/* if case 2 : 퇴사자 */
	    	if (Character.toString(member.getMemberEnt()).equals("Y")) {
	    		log.info("[AttendanceService] 퇴사자는 출근 등록이 불가능 합니다.");
	    		result = 2;
				throw new AttendanceInsertFailedException("퇴사자는 출근 등록이 불가능 합니다.");
	    	}
	    	
			/* 출근 일자 */
			SimpleDateFormat sdf3 = new SimpleDateFormat("yyyyMMdd");
			String attendanceDate = sdf3.format(now);
			attendance.setAttendanceDate(attendanceDate);
			log.info(attendanceDate);
			
			/* if case 3 : 동일 일자 출근 두 번 */
			for(int i = 0; i < member.getAttendance().size(); i++) {
				if(member.getAttendance().get(i).getAttendanceDate().equals(attendance.getAttendanceDate())
						&& member.getAttendance().get(i).getMemberCode().equals(attendance.getMemberCode())) {
					log.info("[AttendanceService] 오늘은 이미 출근 등록이 완료되었습니다.");
					result = 0;
					throw new AttendanceInsertFailedException("오늘은 이미 출근 등록이 완료었습니다.");
				}
			}
			
			attendanceRepository.save(attendance);
			
			result = 1;
	    } catch (Exception e) {
	    	log.info("[Attendance insert] Exception!!");
	    }
	    
	    log.info("[AttendanceService] insertAttendance End ==============================");
	    
	    if (result == 0) {return "출근 등록 실패";} else if(result == 1) {return "출근 등록 성공";} else {return "퇴사자 출근 등록 불가";}
	}
	
	/* 퇴근 modify */
	/*
	 * modify 정보 : 퇴근 시각, 근무 시각, 초과 근무 시간
	 * : create된 출근 값의 퇴근 컬럼을 modify
	 * : 화면단에서 (퇴근 시간 - 출근 시간)을 산정, 근무 시간 modify
	 * : if case 1) 퇴사자 처리
	 * : if case 2) 퇴근 버튼을 두 번 누를 경우> 근무 시간이 not null일 경우 exception처리
	 * : if case 3) 근무시간 > 9일 경우 : (근무시간 - 9)로 초과 근무 시간 산정, 초과 근무 시간 modify
	 * : if case 4) 근무시간 < 8일 경우 : 조퇴처리
	 */
	@Transactional
	public Object updateAttendance(MemberAndAttendanceDTO memberAndAttendanceDTO, AttendanceDTO attendanceDTO) {
		log.info("[AttendanceService] updateAttendance Start ==============================");
		
		MemberAndAttendance member = memberAndAttendanceRepository.findMemberByMemberId(memberAndAttendanceDTO.getMemberId());
		
		int result = 0;
		java.util.Date now = new java.util.Date();
		SimpleDateFormat sdf1 = new SimpleDateFormat("yyyyMMdd");
		String today = sdf1.format(now);
		log.info("[AttendanceService] today : " + today);
		
		List<Attendance> attendanceList = attendanceRepository.findByMemberCode(member.getMemberCode());
		log.info("[AttendanceService] attendance : " + attendanceList);
		
		/* 오늘 출근 값 가져오기 */
		try {
			
			/* if case 1 : 퇴사자 처리 */
	    	if (Character.toString(member.getMemberEnt()).equals("Y")) {
	    		log.info("[AttendanceService] 퇴사자는 출근 등록이 불가능 합니다.");
	    		result = 2;
				throw new AttendanceUpdateFailedException("퇴사자는 출근 등록이 불가능 합니다.");
	    	}
	    	
			for(int i = 0; i < attendanceList.size(); i++) {
				if(attendanceList.get(i).getAttendanceDate().equals(today)){
					
					/* 퇴근 시각 */
					SimpleDateFormat sdf2 = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.KOREA);
					String attendanceEnd = sdf2.format(now);
					log.info("[AttendanceService] attendanceEnd : " + attendanceEnd);
						
					LocalDateTime endDate = null;
					DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.KOREA);
					endDate = LocalDateTime.parse(attendanceEnd, dateTimeFormatter);
						
					/* if case 2 : 한 출석 Number에 퇴근이 두 번 입력될 경우 */
					if (attendanceList.get(i).getAttendanceHour() != null) {
						log.info("[AttendanceService] 오늘은 이미 퇴근 등록이 완료되었습니다.");
						throw new AttendanceUpdateFailedException("오늘은 이미 퇴근 등록이 완료었습니다.");
					}
					attendanceList.get(i).setEnd(endDate);
					attendanceList.get(i).setTitle("퇴근");
					log.info("[AttendanceService] 퇴근시간 등록 성공");
						
					/* 근무 시간 */
					// LocalDateTime을 String형으로 parse, 이를 date형으로 다시 parse 후 계산 -> long형을 set
					LocalDateTime attendanceStart = attendanceList.get(i).getStart();
					String Start = attendanceStart.toString();
					log.info(attendanceEnd);
					log.info(Start);
						
					Date date1 = sdf2.parse(attendanceEnd);
					log.info(" date 1 : {}", date1.toString());
					Date date2 = sdf2.parse(Start + ".000Z");
					log.info(" date 2 : {}", date2.toString());
						
					long date3 = (date1.getTime() - date2.getTime()) / 3600000;
						
					attendanceList.get(i).setAttendanceHour(date3);
					log.info("[AttendanceService] 근무시간 등록 성공");
					
					
						
					/* if case 3 : 초과 근무 시간 발생 시 */
					if(date3 > 9) {
						attendanceList.get(i).setAttendanceOvertime(date3 - 9);
						log.info("[AttendanceService] 초과 근무 시간이 등록성공.");
					}
						
					/* if case 4 : 근무 시간이 일정 시간 이하일 경우 */
					if(date3 < 5) {
						attendanceList.get(i).setTitle("조퇴");
						log.info("[AttendanceService] 조퇴처리 성공.");
					}
					result = 1;
				}
			}
			
		} catch (Exception e) {
			log.info("[attendance update] Exception!!");
		}
			
		log.info("[AttendanceService] updateAttendance End ==============================");
		
		if (result == 0) {return "퇴근 시간 등록 실패";} else if(result == 1) {return "퇴근 시간 등록 성공";} else {return "퇴사자 퇴근 등록 불가";}
	}
	
	/* Management */
	/* 금일 사원 근태 select */
	public Object selectDateAttendanceList(String attendanceDate) {
		log.info("[AttendanceService] selectDateAttendanceList Start ==============================");
		
		List<AttendanceAndMember> dateAttendanceList = attendanceAndMemberRepository.findByAttendanceDate(attendanceDate);
		
		log.info("[AttendanceService] dateAttendaceList {}", dateAttendanceList);
		
		log.info("[AttendanceService] selectDateAttendanceList End ==============================");
		
		return dateAttendanceList.stream().map(attendance -> modelMapper.map(attendance, AttendanceAndMemberDTO.class)).collect(Collectors.toList());
	}

	/* 근태 한 건 조회*/
	public Object selectDateAttendanceOne(long id) {
		
		AttendanceAndMember attendance = attendanceAndMemberRepository.findById(id).get();
		
		return modelMapper.map(attendance, AttendanceAndMemberDTO.class);
	}
	
	/* 사원 근태 정보 수정 */
	@Transactional
	public Object updateEmpAttendance(AttendanceDTO attendanceDTO) {
		log.info("[ManagementService] updateEmpAttendance Start ==============================");
		log.info("[ManagementService] attendanceDTO : {}", attendanceDTO);
		
		int result = 0;
		
		try {
			Attendance attendance = attendanceRepository.findById(attendanceDTO.getId()).get();

			attendance.setTitle(attendanceDTO.getTitle());

			log.info("[ManagementService] attendance : {}", attendance);
			result = 1;
		} catch (Exception e) {
			log.info("[update EmpAttendance] Exception!!");
		}
		
		log.info("[ManagementService] updateEmpAttendance End ==============================");
		
		return (result > 0) ? "사원 근태 정보 수정 성공" : "사원 근태 정보 수정 실패" ;
	}
}