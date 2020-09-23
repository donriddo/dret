// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <=0.7.0;

import "./ERC721Mintable.sol";

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
interface Verifier {
    function verifyTx(
        uint256[2] memory a,
        uint256[2][2] memory b,
        uint256[2] memory c,
        uint256[2] memory input
    ) external view returns (bool r);
}

// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is DRET {
    Verifier verifierContract;

    constructor(address verifierContractAddress) public {
        verifierContract = Verifier(verifierContractAddress);
    }

    // TODO define a solutions struct that can hold an index & an address
    struct Solution {
        uint256 index;
        address solver;
        bool isCorrect;
    }

    Counters.Counter solutionIndex;
    Counters.Counter tokenIndex;

    // TODO define an array of the above struct
    Solution[] solutions;

    // TODO define a mapping to store unique solutions submitted
    mapping(bytes32 => Solution) submittedSolutions;

    // TODO Create an event to emit when a solution is added
    event NewSolution(address solver, bool isCorrect);

    // TODO Create a function to add the solutions to the array and emit the event
    function _addSolution(
        uint256[2] memory a,
        uint256[2][2] memory b,
        uint256[2] memory c,
        uint256[2] memory input
    ) internal returns (bool) {
        bytes32 key = keccak256(abi.encodePacked(a, b, c, input));

        require(
            !submittedSolutions[key].isCorrect,
            "This particular solution has been used"
        );

        Solution memory newSolution;

        solutionIndex.increment();

        newSolution.index = solutionIndex.current();
        newSolution.solver = msg.sender;
        newSolution.isCorrect = verifierContract.verifyTx(a, b, c, input);

        submittedSolutions[key] = newSolution;
        solutions.push(newSolution);

        emit NewSolution(msg.sender, newSolution.isCorrect);

        return newSolution.isCorrect;
    }

    // TODO Create a function to mint new NFT only after the solution has been verified
    //  - make sure the solution is unique (has not been used before)
    //  - make sure you handle metadata as well as tokenSuplly
    function mintDRET(
        uint256[2] memory a,
        uint256[2][2] memory b,
        uint256[2] memory c,
        uint256[2] memory input
    ) public {
        // keeps track of all solutions whether correct or wrong
        bool solutionIsCorrect = _addSolution(a, b, c, input);
        require(solutionIsCorrect, "Solution provided is not correct");

        tokenIndex.increment();
        super.mint(msg.sender, tokenIndex.current());
    }
}
