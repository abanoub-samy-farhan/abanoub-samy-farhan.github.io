---
title: Compiler, Interpreter or Both ?
date: 2024-09-04
description: A comparison between compilers and interpreters, and how modern languages use both techniques.
tags:
    - compilers
    - aot
    - jit
    - interpreters
image: {
    src: "/covers/com-inter-cover.png",
    alt: "Compiler vs Interpreter",
}
duration: 4 min
---

## Introduction
Learning a new language would involve many steps, including getting familiar with the syntax, libraries, and technologies based on those languages such as Python and JavaScript, but most importantly learning how those languages are understood by the machine. Every language has its journey from human-readable syntax to machine-readable 0’s and 1’s. This process is called compilation for some languages and interpretation for others, but why do we need different translation methods in the first place? In this article, we will discuss some of the key differences between them and the area of industry concerned with using those types.

<hr class="hr-line" />

## Compilation
Compilation is translating the source code (the normal syntax of the programming language used) into other forms such as machine code, object code, and bytecode. this process is done using a special program called compilers. This process is mostly referred to as Ahead-of-time compilation (AOT).

Machine code is the final stage for the code to be understandable by the computers, however, some compilers could generate intermediate states such as object code and bytecode. Intermediate states are at a higher level than machine code and could be very useful for some purposes, such as some Java compilers which were the first to introduce the bytecode translation instead of machine code. That’s because it can be executed on any system running a Java virtual machine or bytecode interpreter, which would enhance the portability of the code that doesn’t bind to any device architecture.

Compilers differ in the way they analyze and convert different languages to machine code, but they typically carry out the following steps :

- **Lexical analysis**: this is the screening phase of the code where the source code is analyzed and broken down into small segments called lexemes, which are tokenized, classified (classify keywords, identifiers, operators, and symbols), validated and finally generated a final output which is a list of tokens that would be passed to the syntax and semantic analysis
- **Syntax analysis**: the compilers recognize the syntax of the language and verify its validity during this stage, also referred to as parsing the code. the compiler creates syntax trees that represent the logical order of the code.
- **Semantic analysis**: the compilers verify the validity of the code logic, based on the source language’s rules. the compilers identify the accuracy of the code and figure out the errors of having mismatched types and proper declaration issues.
- **Intermediate Representation (IR)**: after checking the accuracy and the validity of the code. the code is primarily translated into an intermediate representation code that could be easily converted into any other format.
- **Optimization**: the compiler optimizes the IR code to prepare it for conversion into other formats and improve performance. the extent of optimization differs from one compiler to another, some of them let users determine the extent of the optimization they would prefer.
- **Code generation**: the final stage of generating the output machine code. this also involves the linking stage of the object files to other files of the application and creates the final executable output.
Now we know the compilers and their work schema, let’s dive into the interpreters to notice the key differences between them.

## Interpreters
Interpreters are computer programs that are used to execute High-level languages without the need of previous compiling process into machine code. They process the code one statement at a time at runtime, without pre-converting the code or preparing it in advance for a particular platform. This is particularly beneficial in the development cycle of large programs because it can be easily debugged. During the software development cycle, programmers make frequent changes to the source code, using interpreted language to enable them to display all the changes during the runtime of the program without the need to recompile the source code and link all the binary code files in an executable file.

The process of translation using an interpreter is mostly similar to that of the compiler. both of them use tokenization to parse the source code to produce a parsing tree (the logic tree of the program). the main difference is that the compilers are using a linker to produce a stand-alone machine code program, while interpreters perform the process of the high-level source code directly. Therefore, generally interpreting a program is slower than running a compiled program.

## Just in time (JIT) compilation
Interpretation and compilation are not mutually exclusive operations. as most of the interpreting systems use some of the translation work, just like the compilers. Therefore the terms “interpreted language” and “compiled language” are related to the implementation of the language to use interpreter or a compiler.

Just-in-time compilation is an example of a hybrid approach between compilation and interpretation processes. JIT is a compilation during the runtime of the program rather than before execution. JIT combines the speed of ahead-of-time compilation (relatively) and the flexibility of the interpretation, with the overhead of compiling and linking processes and the overhead of the interpreter.

The source code is translated into a bytecode (intermediate representation). The bytecode is then to be interpreted using an interpreter or run over a virtual machine. The JIT systems dynamically read the bytecodes and dynamically compile them. the code can be compiled upon execution (that’s why it is called “just in time”), then cached and reused later without the need to recompile them. which is generally much faster than traditional interpreters.

<hr class="hr-line" />

To sum up, compilers and interpreters are only just tools to translate our language to computers. Noticing the differences and the advancements of those systems is one way to understand how our systems flow and be more aware of what happening underneath the hood. I hope you enjoyed it and see you next time:).
