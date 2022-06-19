//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

import "@openzeppelin/contracts/utils/Counters.sol";

contract Blog {
    string public name;
    address public owner;

    using Counters for Counters.Counter;
    Counters.Counter private _postIds;

    struct Post {
        uint256 id;
        string title;
        string content;
        bool isPublished;
    }

    mapping(uint256 => Post) private idToPost;
    mapping(string => Post) private hashToPost;

    event PostCreated(uint256 id, string title, string hash);
    event PostUpdated(uint256 id, string title, string hash, bool isPublished);

    constructor(string memory _name) {
        console.log("Deploying The blog name: ", _name);
        name = _name;
        owner = msg.sender;
    }

    function updateName(string memory _name) public {
        name = _name;
    }

    function transferOwnership(address newOwner) public onlyOwner {
        owner = newOwner;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    function fetchPost(string memory hash) public view returns (Post memory) {
        return hashToPost[hash];
    }

    function createPost(string memory title, string memory hash)
        public
        onlyOwner
    {
        _postIds.increment();
        uint256 postId = _postIds.current();
        Post storage post = idToPost[postId];
        post.id = postId;
        post.title = title;
        post.isPublished = true;
        post.content = hash;
        hashToPost[hash] = post;
        emit PostCreated(postId, title, hash);
    }

    function updatePost(
        uint256 postId,
        string memory title,
        string memory hash,
        bool isPublished
    ) public onlyOwner {
        Post storage post = idToPost[postId];
        post.title = title;
        post.isPublished = isPublished;
        idToPost[postId] = post;
        hashToPost[hash] = post;
        emit PostUpdated(post.id, title, hash, isPublished);
    }

    function fetchPosts() public view returns (Post[] memory) {
        uint256 numberOfThePosts = _postIds.current();

        Post[] memory posts = new Post[](numberOfThePosts);
        for (uint256 i = 0; i < numberOfThePosts; i++) {
            uint256 currentId = i + 1;
            Post storage currentItem = idToPost[currentId];
            posts[i] = currentItem;
        }

        return posts;
    }
}
