package com.ssafy.moida.repository.article;

import com.ssafy.moida.model.article.Board;
import com.ssafy.moida.model.article.BoardDocument;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BoardDocumentRepository extends JpaRepository<BoardDocument, Long> {
    List<BoardDocument> findByBoard(Board board);
}
