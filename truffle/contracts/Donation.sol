// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Donation {
    struct DonationHistory {
        string nickname; // 기부자
        uint256 projectId; // 기부 프로젝트 ID
        string subject; // 기부 프로젝트 소제목
        uint generation; // 기부 프로젝트 기수
        string date; // 기부 일시
        uint256 amount; // 기부한 포인트
    }

    DonationHistory[] public donationHistories; // 기부 내역 배열

    // 배열에 새로운 값 추가 -> 해당 인덱스 반환
    function addDonationHistory(string memory nickname, uint256 projectId, string memory subject, uint generation, string memory date, uint256 amount) public returns (uint256) {
         //uint256 length = getDonationHistoriesLength();
         //donationHistories[length] = DonationHistory(nickname, projectId, subject, generation, date, amount);
         donationHistories.push(DonationHistory(nickname, projectId, subject, generation, date, amount));

         return getDonationHistoriesLength() - 1;
    }

    // donationHistories 배열의 길이 구하기
    function getDonationHistoriesLength() public view returns (uint256) {
        return donationHistories.length;
    }

    // 특정 인덱스의 DonationHistory 조회
    function getDonationHistory(uint index) public view returns (DonationHistory memory) {
        require(index < getDonationHistoriesLength(), "Invalid index");

        return donationHistories[index];
    }

    // 기부 내역 조회 - 페이지내이션
    function getDonationHistories(uint256 page, uint256 pageSize) public view returns (DonationHistory[] memory) {
        require(page > 0, "Page number must be greater than 0");
        require(pageSize > 0, "Page size must be greater than 0");

        uint256 startIndex = (page - 1) * pageSize;
        uint256 endIndex = startIndex + pageSize > donationHistories.length ? donationHistories.length : startIndex + pageSize;

        DonationHistory[] memory result = new DonationHistory[](endIndex - startIndex);

        for (uint256 i = startIndex; i < endIndex; i++) {
            result[i - startIndex] = donationHistories[i];
        }

        return result;
    }
}