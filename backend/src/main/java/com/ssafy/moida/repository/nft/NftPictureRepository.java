package com.ssafy.moida.repository.nft;

import com.ssafy.moida.model.nft.NftPicture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface NftPictureRepository extends JpaRepository<NftPicture, Long> {

    @Query("select np.url from NftPicture np where np.id = :id")
    String findUrlById(@Param("id") Long randomNum);
}
