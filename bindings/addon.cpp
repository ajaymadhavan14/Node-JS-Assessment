#include <node.h>
#include <v8.h>
#include <iostream>
#include <iomanip>
#include <sstream>

std::string toHex(unsigned int value) {
    std::stringstream stream;
    stream << std::hex << std::setfill('0') << std::setw(8) << value;
    return stream.str();
}

void SimpleHash(const v8::FunctionCallbackInfo<v8::Value>& args) {
    v8::Isolate* isolate = args.GetIsolate();

    if (args.Length() < 1 || !args[0]->IsString()) {
        isolate->ThrowException(v8::Exception::TypeError(
            v8::String::NewFromUtf8(isolate, "Invalid argument: string expected")));
        return;
    }

    v8::String::Utf8Value input(args.GetIsolate(), args[0]->ToString(isolate));
    std::string inputString(*input);

    unsigned int hash = 0;
    for (char c : inputString) {
        hash += static_cast<unsigned int>(c);
        hash += (hash << 10);
        hash ^= (hash >> 6);
    }

    hash += (hash << 3);
    hash ^= (hash >> 11);
    hash += (hash << 15);

    std::string hashString = toHex(hash);
    args.GetReturnValue().Set(v8::String::NewFromUtf8(isolate, hashString.c_str()));
}

void Initialize(v8::Local<v8::Object> exports) {
    NODE_SET_METHOD(exports, "simpleHash", SimpleHash);
}

NODE_MODULE(addon, Initialize)
