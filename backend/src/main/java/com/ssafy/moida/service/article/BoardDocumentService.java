package com.ssafy.moida.service.article;

import com.ssafy.moida.model.article.Board;
import com.ssafy.moida.model.article.BoardDocument;
import com.ssafy.moida.repository.article.BoardDocumentRepository;
import com.ssafy.moida.utils.S3Uploader;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class BoardDocumentService {
    private final BoardDocumentRepository boardDocumentRepository;
    private final S3Uploader s3Uploader;

    public BoardDocumentService(BoardDocumentRepository boardDocumentRepository, S3Uploader s3Uploader) {
        this.boardDocumentRepository = boardDocumentRepository;
        this.s3Uploader = s3Uploader;
    }

    /**
     * [세은] 봉사 공지사항 서류 저장
     * @param fileList
     * @param board
     */
    @Transactional
    public void save(List<MultipartFile> fileList, Board board) throws IOException {
        for (int i = 0; i < fileList.size(); i++) {
            // S3 업로드 후 url 반환
            String url = s3Uploader.uploadFileToS3(fileList.get(i), "static/project");

            BoardDocument boardDocument = BoardDocument.builder()
                    .url(url)
                    .board(board)
                    .build();

            boardDocumentRepository.save(boardDocument);
        }
    }

    /**
     * [세은] 공지사항에 따른 문서 조회
     * @param board
     * @return
     */
    public List<String> getFileList(Board board){
        List<BoardDocument> fileList = boardDocumentRepository.findByBoard(board);
        return fileList.stream()
            .map(document -> document.getUrl())
            .collect(Collectors.toList());
    }
}
