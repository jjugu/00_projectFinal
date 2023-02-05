package com.majorcompany.hicompany.management.service;

import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.majorcompany.hicompany.board.dto.BoardAndMemberDTO;
import com.majorcompany.hicompany.board.entity.BoardAndMember;
import com.majorcompany.hicompany.common.Criteria;
import com.majorcompany.hicompany.management.repository.ManagementRepository;
import com.majorcompany.hicompany.member.dto.MemberDTO;
import com.majorcompany.hicompany.member.entity.Member;
import com.majorcompany.hicompany.util.FileUploadUtils;

@Service
public class ManagementService {

	private static final Logger log = LoggerFactory.getLogger(ManagementService.class);
	private final ModelMapper modelMapper;
	private final ManagementRepository managementRepository;
	
	@Value("${image.image-dir}")
    private String IMAGE_DIR;
	@Value("${image.image-url}")
    private String IMAGE_URL;
	
	@Autowired
	public ManagementService(ModelMapper modelMapper, ManagementRepository managementRepository) {
		this.modelMapper = modelMapper;
		this.managementRepository = managementRepository;
	}
	
	/* 사원 전체 select */
	public List<MemberDTO> selectEmpAllList() {
		log.info("[ManagementService] selectEmpAllList Start ==============================");
		
		List<Member> memberAllList = managementRepository.findAll();
		
		log.info("[ManagementService] memberAllList {}", memberAllList);
		
		log.info("[ManagementService] selectEmpAllList End ==========================");
		
		return memberAllList.stream().map(member -> modelMapper.map(member, MemberDTO.class)).collect(Collectors.toList());
	}
	
	/* 사원 한 명 select */
	public MemberDTO selectEmpOne(Long memberCode) {
		log.info("[ManagementService] selectMemberSalaryList Start ============================");
		
		Member selectMember = managementRepository.findByMemberCode(memberCode);
		log.info("[ManagementService] selectMember: {}",  selectMember);
		selectMember.setMemberFile(IMAGE_URL + selectMember.getMemberFile());
		
		log.info("[ManagementService] selectMemberSalaryList End ==============================");
		
		return modelMapper.map(selectMember, MemberDTO.class);
	}
	
	/* 사원 modify */
	@Transactional
	public Object updateEmp(MemberDTO memberDTO, MultipartFile memberImage) {
		log.info("[ManagementService] updateAttendance Start ==============================");
		log.info("[ManagementService] memberDTO : {}", memberDTO);
		
		String replaceFileName = null;
		int result = 0;
		
		try {
			Member member = managementRepository.findByMemberCode(memberDTO.getMemberCode());
			log.info("member {}", member);
        	String oriImage = member.getMemberFile();
            log.info("[updateAttendance] oriImage : " + oriImage);
			
			member.setMemberName(memberDTO.getMemberName());
			member.setMemberBirth(memberDTO.getMemberBirth());
			member.setMemberTel(memberDTO.getMemberTel());
			member.setMemberAddress(memberDTO.getMemberAddress());
			member.setMemberLeave(memberDTO.getMemberLeave());
			member.setMemberEnt(memberDTO.getMemberEnt());
			member.setMemberRemanet(memberDTO.getMemberRemanet());
			member.setMemberDep(memberDTO.getMemberDep());
			member.setMemberRtPayment(memberDTO.getMemberRtPayment());
			member.setMemberRtStatus(memberDTO.getMemberRtStatus());
			member.setMemberId(memberDTO.getMemberId());
			member.setMemberEmail(memberDTO.getMemberEmail());
			member.setMemberSalaryBonus(memberDTO.getMemberSalaryBonus());
			member.setMemberGrade(memberDTO.getMemberGrade());
			log.info("여기까진 되나요?");
			log.info("productImage {}", memberImage);
			
			if(memberImage != null) {
				log.info("진짜null이야?");
                String imageName = UUID.randomUUID().toString().replace("-", "");
                replaceFileName = FileUploadUtils.saveFile(IMAGE_DIR, imageName, memberImage);
                log.info("[updateProduct] InsertFileName : " + replaceFileName);
                
                member.setMemberFile(replaceFileName);	// 새로운 파일 이름으로 update
                log.info("[updateProduct] deleteImage : " + oriImage);
                
                boolean isDelete = FileUploadUtils.deleteFile(IMAGE_DIR, oriImage);
                log.info("[update] isDelete : " + isDelete);
            } else {
            	
                /* 이미지 변경 없을 시 */
            	member.setMemberFile(oriImage);
            }

			log.info("[ManagementService] member : {}", member);
			result = 1;
		} catch (IOException e) {
			log.info("[updateProduct] Exception!!");
            FileUploadUtils.deleteFile(IMAGE_DIR, replaceFileName);
            throw new RuntimeException(e);
		}
		
		log.info("[ManagementService] updateAttendance End ==============================");
		
		return (result > 0) ? "사원 정보 수정 성공" : "사원 정보 수정 실패" ;
	}
	
	public int selectEmpTotal() {
		/* 페이징 처리 결과를 Page 타입으로 반환받음 */
		int result = managementRepository.findAll().size();
		
		return result;
	}
	
	@Transactional
	public Object selectEmpList(Criteria cri) {
		
		int index = cri.getPageNum() -1;
		int count = cri.getAmount();
		Pageable paging = PageRequest.of(index, count, Sort.by("memberCode"));

		Page<Member> result = managementRepository.findAll(paging);
		List<Member> empList = (List<Member>)result.getContent();
		
		return empList.stream().map(board -> modelMapper.map(board, MemberDTO.class)).collect(Collectors.toList());
	}
}	