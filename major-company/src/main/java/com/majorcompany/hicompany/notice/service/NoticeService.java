package com.majorcompany.hicompany.notice.service;

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
import com.majorcompany.hicompany.notice.dto.NoticeAndMemberDTO;
import com.majorcompany.hicompany.notice.dto.NoticeDTO;
import com.majorcompany.hicompany.notice.entity.Notice;
import com.majorcompany.hicompany.notice.entity.NoticeAndMember;
import com.majorcompany.hicompany.notice.repository.NoticeAndMemberRepository;
import com.majorcompany.hicompany.notice.repository.NoticeRepository;

@Service
public class NoticeService {

	private static final Logger log = LoggerFactory.getLogger(NoticeService.class);
	private final NoticeRepository noticeRepository;
	private final NoticeAndMemberRepository noticeAndMemberRepository;
	private final ModelMapper modelMapper;
	
	@Autowired
	public NoticeService(NoticeRepository noticeRepository, NoticeAndMemberRepository noticeAndMemberRepository, ModelMapper modelMapper) {
		this.noticeRepository = noticeRepository;
		this.noticeAndMemberRepository = noticeAndMemberRepository;
		this.modelMapper = modelMapper;
	}

	public int selectNoticeTotal(){
		log.info("[NoticeService] selectNoticeTotal Start ------------");
		
		/* 페이징 처리 결과를 Page 타입으로 반환받음 */
		int result = noticeAndMemberRepository.findAll().size();
		
		log.info("[NoticeService] selectNoticeTotal End --------------");
		
		return result;
		
	}
	
	/* 공지사항 글 전체조회 서비스 */
	@Transactional
	public Object selectNoticeList(Criteria cri) {
		log.info("[NoticeService] selectNoticeList Start ===================================");

        int index = cri.getPageNum() - 1;
        int count = cri.getAmount();
        Pageable paging = PageRequest.of(index, count, Sort.by("noticeNo").descending());
        
        Page<NoticeAndMember> result = noticeAndMemberRepository.findAll(paging);
        List<NoticeAndMember> noticeList = (List<NoticeAndMember>)result.getContent();
        
        
        log.info("====================" + noticeList);
        log.info("[NoticeService] selectNoticeList End ==============================");

        return noticeList.stream().map(notice -> modelMapper.map(notice, NoticeAndMemberDTO.class)).collect(Collectors.toList());
	}

	/* 공지사항 글 작성 서비스 */
	@Transactional
	public Object insertNotice(NoticeDTO noticeDTO) {
		log.info("[NoticeService] insertNotice Start ===================================");
        log.info("[NoticeService] noticeDTO : " + noticeDTO);
		
        Notice insertNotice = modelMapper.map(noticeDTO, Notice.class);
        
        
        return noticeRepository.save(insertNotice);
	}
	
	/* 공지사항 글 수정 서비스 */
	@Transactional
	public Object updateNotice(NoticeDTO noticeDTO) {
		log.info("[NoticeService] updateNotice Start ========");
		log.info("[NoticeService] noticeDTO : " + noticeDTO);
		
		Notice updatenotice = noticeRepository.findById(noticeDTO.getNoticeNo()).get();
		
		/* setter 꺼내기 */
		updatenotice.setNoticeTitle(noticeDTO.getNoticeTitle());
		updatenotice.setNoticeContent(noticeDTO.getNoticeContent());
				
		log.info("[NoticeService] updateNotice End============");
		
		return updatenotice;
	}

	/* 공지사항 삭제 서비스 */
	@Transactional
	public Object deleteNotice(NoticeAndMemberDTO noticeAndMemberDTO) {
		log.info("[NoticeService] deleteNotice Start ==========");
		log.info("[NoticeService] noticeAndMemberDTO =========: " + noticeAndMemberDTO);
		
		
		NoticeAndMember deleteNotice = modelMapper.map(noticeAndMemberDTO, NoticeAndMember.class);
		noticeAndMemberRepository.delete(deleteNotice);

		log.info("[NoticeService] =========deleteNotice End============");
		
		log.info("[NoticeService] noticeAndMemberDTO =========: " + noticeAndMemberDTO);
		log.info("[NoticeService] deleteNotice ============" + deleteNotice);
		return deleteNotice;
	}
	
	/* 공지사항 글 상세페이지 서비스 */
	@Transactional
	public Object selectNoitce(int noticeNo) {
		log.info("[NoticeService] selectNotice Start =============");
//		System.out.println(noticeNo);
		Notice notice = noticeRepository.findById(noticeNo).get();
		
		log.info("[NoticeService] selectNotice End ===============");
		
		return modelMapper.map(notice, Notice.class);
	}
	
}