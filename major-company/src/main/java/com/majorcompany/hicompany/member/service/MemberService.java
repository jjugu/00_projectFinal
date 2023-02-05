package com.majorcompany.hicompany.member.service;

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
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.majorcompany.hicompany.member.dto.MemberDTO;
import com.majorcompany.hicompany.member.entity.Member;
import com.majorcompany.hicompany.member.repository.MemberRepository;
import com.majorcompany.hicompany.util.FileUploadUtils;

@Service
public class MemberService {

	private static final Logger log = LoggerFactory.getLogger(MemberService.class);
	private final MemberRepository memberRepository;
	private final ModelMapper modelMapper;
	
	/* 이미지 저장 할 위치 및 응답 할 이미지 주소(WebConfig 설정파일 추가하기) */
    @Value("${image.image-dir}")
    private String IMAGE_DIR;
    @Value("${image.image-url}")
    private String IMAGE_URL;
	
	@Autowired
	public MemberService(MemberRepository memberRepository, ModelMapper modelMapper) {
		this.memberRepository = memberRepository;
		this.modelMapper = modelMapper;
	}
	
	public MemberDTO selectMyInfo(String memberId) {
		log.info("[MemberService] getMyInfo Start =======================");
		
		Member member = memberRepository.findByMemberId(memberId);
		member.setMemberFile(IMAGE_URL + member.getMemberFile());
		log.info("[MemberService] {}", member);
		log.info("[MemberService] getMyInfo End =========================");
		
		return modelMapper.map(member, MemberDTO.class);
	}

	public List<MemberDTO> selectMemberList() {
		log.info("[MemberService] selectMemberList Start =======================");
		
		List<Member> memberList = memberRepository.findAll();
		log.info("memberList{}", memberList);
		log.info("[MemberService] selectMemberList End =========================");
		return memberList.stream().map(member -> modelMapper.map(member, MemberDTO.class)).collect(Collectors.toList());
	}

	public MemberDTO validMemberId(String memberId) {
		log.info("[MemberService] validMemberId Start =======================");
		
		Member member = memberRepository.findByMemberId(memberId);
		log.info("[MemberService] {}", member);
		log.info("[MemberService] validMemberId End =========================");
		
		return modelMapper.map(member, MemberDTO.class);
	}

	@Transactional
	public Object updateMember(MemberDTO memberDTO, MultipartFile memberImage) {
		log.info("[MemberService] updateMember Start ===================================");
        log.info("[MemberService] memberDTO : " + memberDTO);
        
        String replaceFileName = null;
        int result = 0;

        try {
        	
        	/* update 할 엔티티 조회 */
        	Member member = memberRepository.findById(memberDTO.getMemberCode()).get();
        	String oriImage = member.getMemberFile();
            log.info("[updateProduct] oriImage : " + oriImage);
            
            /* update를 위한 엔티티 값 수정 */
            member.setMemberEmail(memberDTO.getMemberEmail());
            member.setMemberTel(memberDTO.getMemberTel());
            
            if(memberImage != null){
                String imageName = UUID.randomUUID().toString().replace("-", "");
                replaceFileName = FileUploadUtils.saveFile(IMAGE_DIR, imageName, memberImage);
                log.info("[updateMember] InsertFileName : " + replaceFileName);
                
                member.setMemberFile(replaceFileName);	// 새로운 파일 이름으로 update
                log.info("[updateMember] deleteImage : " + oriImage);
                
                boolean isDelete = FileUploadUtils.deleteFile(IMAGE_DIR, oriImage);
                log.info("[update] isDelete : " + isDelete);
            } else {
            	
                /* 이미지 변경 없을 시 */
            	member.setMemberFile(oriImage);
            }

            result = 1;
        } catch (IOException e) {
            log.info("[updateMember] Exception!!");
            FileUploadUtils.deleteFile(IMAGE_DIR, replaceFileName);
            throw new RuntimeException(e);
        }
        log.info("[MemberService] updateMember End ===================================");
        return (result > 0) ? "프로필 수정 성공" : "프로필 수정 실패";
	}
}
