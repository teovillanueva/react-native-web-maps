#include <jni.h>
#include "teovillanueva-react-native-web-maps.h"

extern "C"
JNIEXPORT jint JNICALL
Java_com_teovillanuevareactnativewebmaps_ReactNativeWebMapsModule_nativeMultiply(JNIEnv *env, jclass type, jint a, jint b) {
    return example::multiply(a, b);
}
