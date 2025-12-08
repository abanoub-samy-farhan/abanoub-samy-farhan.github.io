---
title: Operating System Concepts - Chapter 10
date: 2025-12-08
description: Notes on Chapter 10 of Operating System Concepts - 10th Edition
tags:
    - operating systems
    - virtual memory
    - lru
    - copy on write
group: OS
image: {
    src: /covers/os_cover.jpg,
    alt: Operating System Concepts Book Cover,
}
---

Welcome back, I know I'm not actually really consistent in this series but I will try my best in the upcoming times. Wish me luck.

Anyway, in this chapter I discovered a lot of interesting stuff that I'm excited to share and summarize. So let's dive in.

# Virtual Memory

**Virtual memory** is a technique that allows the seperation of logical memory from physical memory (By physical memory I mean RAM, so not to get confused later). This technique facilitates the development process alot, as programmers don't care about where their code gonna live eventually it's the OS task to manage that. Additionally, virtual memory allows the execution of processes that are larger than the physical memory itself, by using secondary storage (like disks) as an extension to the physical memory (This accompaines with some other analgies that we shall discuss shortly).

**Virtual address space** of a process refers to the logical view of the memory and how the process stored the data in memory. Each process has its own virtual address space, which is divided into blocks called **pages**. The size of a page is typically between 512 bytes to 16 MB, depending on the architecture and hardware ig. The virtual address space of a process is similar to the following layout:

<img src="/images/process_v_layout.png" alt="Virtual address space layout of a process" class="blog-image" />

As you can see, the virtual address space has a large blank space, between the heap and the stack, this space is not mapped yet in the virtual memory, nor the physical memory. But as the data grows, the OS can map this space to physical memory as needed.

Virtual memory also enables *page sharing* between processes, like shared libraries in Linux or C. This means that if process A and process B both use the same library, the OS can map the same physical page to both processes' virtual address spaces, which is a win win situation. Why that is possible ? because shared libs are typically read-only, so no process can modify the content of the pages they share (or can they? try to think in a design where processes can edit shared space safely). This can be also used during the `fork()` syscall, where the child not nessciarly needs a full copy of the parent's memory space, instead both parent and child can share the same pages until one of them tries to modify a page (This is called **copy-on-write**, we will discuss it shortly).

<hr class="hr-line" />

## Demand Paging
Now, when you play a game or run an application, do you need all the program or game logic to be loaded in the memory at once? Most likely no, there are some codes for corner cases and error handling that could be rarely be executed. So instead of loading the whole program into memory (which is not realistic think about loading Rainbow Six Siege entirely into RAM you gotta be giga rich for that). Alternatively, The OS can load only the pages you need to execute the program, and while you are playing, if you needed additional pages from the disk, the OS can load them on demand. This technique is called **demand paging**.

Demand paging requires the hardware support of a **page table** and a **page fault** mechanism. Consider you have a full logical memory of 4 pages A, B, C, D, this is your entire program. However, the OS only loads pages A and C into memory. Now, when the CPU tries to access page B, it will be mapped to nowhere in the physical memory, this will cause a **page fault**. page fault will make the OS intervene, and the logic will be as follows:
1. The OS will check an internal table to see if page B is a valid page in the logical memory.
2. If it is invalid, teriminate it. If it is valid, but not yet loaded in physical memory, we page it now to the physical memory.
3. Checking if there is a free frame in physical memory, if yes, load page B into that frame. If no free frame, we need to evict a page from physical memory using a **page replacement** algorithm (we will discuss it as well).
4. Update the page table to reflect the new mapping of page B to the physical frame.
5. Restart the instruction that caused the page fault in order to execute normally as nothing happened.

<img src="/images/page_fault_flow.png" alt="Demand paging mechanism" class="blog-image" />

There is an extreme case of demand paging called **pure demand paging**, where no pages are loaded into memory at all when the process starts, and all pages are loaded on demand. This kinda sucks you know, because the first instruction will be a page fault for sure, the second might be as well, and you will spend a lot of time doing I/O while you could have loaded some pages in advance.

Let's take an example to see how page faults are handled, consider the following ADD operation:
```assembly
ADD C, A, B
```

In this instruction, the CPU tries to add A and B, and store the result in C. I already have loaded A and B, so I will add them normally, but C is not yet loaded. So when the CPU tries to store the result in C, it will cause a page fault. The OS will handle the page fault as discussed before, knowing that C is a valid page, it will get it and then restart this instruction, decoding it again and adding A and B again, this is few nanoseconds not a big deal.

It gets bad when you have multiple page faults in a row, like if A, B, and C were all not loaded. you will do this rolercoaster for each page fault of them. Even worse, what about instructions that are used to move data from source to destination, like:

```assembly
MOV C, A
```

Where those two operands can overlap in memory, so restarting the instruction again after processing it partially will cause a mess.

OS designers always come with great solutions, so to solve this problem, the OS can use one solution to try to access the beginning and the end of the instruction, knowing that they are going to be sequenctially accessed, so if there was no page faults in the beginning and the end, the OS can assume that the middle part is safe to access as well without causing page faults. The other solution uses temporary registers to store the data overritten, if a page fault happens, the OS can restore the data from them before traping the process. (What about you ? Do you have better solutions ?).

### Free-Frame List

**Free frame list** is simply a list of free frames in the physical memory that any process can request when it needs. it's simply *zero filled pages* in the RAM that are not yet allocated to any process. Imagine it is a linked list (actually xv6 is doing it like that), where each node is a free frame, and the head of the list is the first free frame. When a process needs a frame, it takes the head of the list, and when it releases a frame, it adds it back to the head of the list.

*To be continued*
