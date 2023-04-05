package com.ssafy.moida.repository.nft;

import com.ssafy.moida.api.response.GetUserNftResDto;
import com.ssafy.moida.model.nft.Nft;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Repository;

@Repository
public interface NftRepository extends JpaRepository<Nft, Long>,
        PagingAndSortingRepository<Nft, Long> {

    @Query(
            value = "SELECT new com.ssafy.moida.api.response.GetUserNftResDto("
                    + "n.id, "
                    + "n.metaDataUrl, "
                    + "n.nftPicture.url, "
                    + "n.name) "
                    + "FROM Nft n "
                    + "WHERE n.users.id = :userId "
                    + "ORDER BY n.regDate DESC ",
            countQuery = "SELECT COUNT(*) from Nft nf where nf.users.id = :userId"
    )
    Page<GetUserNftResDto> findNftsByUserId(@Param("userId") Long userId, Pageable pageable);

    @Query("select count(*) from Nft n where n.users.id = :userId")
    Long CountFindNftsByUserId(@Param("userId") Long userId);

    @Query("select count(n.id) > 0 from Nft n where n.users.id = :userId and n.id = :nftId")
    boolean existsByIdAndUserId(@Param("userId") Long userId, @Param("nftId") Long nftId);

    @Query("select count(n.id) > 0 from Nft n where n.nftPicture.id = :imgNum")
    boolean existsByNftPictureId(@Param("imgNum") int imgNum);
}
