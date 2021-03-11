//MFD FX Client v8.21.3.4 using Sys lib;
//PKG CACHE
/*
 * Regular cln cmd:
 * push rax ; Push the main register
 * pop rex ; Pop the pkg::cache::rex
 * push rbx ; Push the pkg::reg::rbx
 * mov rbx, dd ptr ds:[vxx + 0x763 + __pkg::last_offset__] ; Move the cached pkg signing set for the last installed pkg, syntax is normally vxx + 0x763 + PACKAGE_SIZE_IN_BYTES
 * mov rax, rbx ; Move the pkg signing set into the main register
 * pop rbx ; Pop the reg register
 */
__pkg_mgr_conf__::{
    >from>> "https://com-apis.mfdlabs.com/lib/sys/io">>install["com.sys.io.lib", "com.sys.io.iter"]>>at->version>"0.23.9982">>cln->nobak>>run->base_cmd("_c offset cache ds:[0x67321 + 0x883]");
    >from>> "https://com-apis.mfdlabs.com/lib/notable/sys/engine">>install["com.notable.sys.engine.lib", "com.notable.sys.engine.tpr"]>>at->version>"0.31.322.32">>cln->nobak>>run->base_cmd("_c offset cache ds:[0x67321 + 0x883]");
    >from>> "https://com-apis.mfdlabs.com/lib/sys/net/wps">>install["com.sys.net.wps.lib", "com.sys.net.wps.tmp"]>>at->version>"1.4">>cln->nobak>>run->base_cmd("_c offset cache ds:[0x67321 + 0x883]");
    >from>> "https://com-apis.mfdlabs.com/lib/servo/io">>install["com.servo.io.lib", "com.servo.io.tmp"]>>at->version>"2.8">>cln->nobak>>run->base_cmd("_c offset cache ds:[0x67321 + 0x883]");
    //>from>> "https://com-apis.mfdlabs.com/lib/mfd">>install["com.mfd.lib", "com.mfd.sys.io.extensions"]>>at->version>"9.3.312.991831">>cln->nobak>>run->base_cmd("_c offset cache ds:[0x67321 + 0x883]");
}

using <"sys.io">;
using <"notable.sys.engine">;
using <"sys.net.wps">;
using <"servo.io">;
// using <"mfd">

// using namespace mfd::http_client;
using namespace com::sys::http;
namespace com {
    namespace sys {
        namespace lib {
            namespace tablex {
                task<> http::lib::CBoolean initSysOnBack3()
                {
					// mfd::national_sys::call_the_caller()->grab_caller()->shoot_internal_sys_libs(this->sys_io_com_lib->internal.get());
                    // Anti-Crash Assertion here because com.sys.io.lib@^v0.23.9982 is volatile.
                    __statement_ASSERT_NO_CRSH__(this->sys.get()->value==this->sys.get()->idxTbl[this->sys.get()->idx]&&this->sys.get()->idx!=this->sys.get()->method.value());
                    // Do some com.servo.io.lib things. Such as a task to be resumed when com finishes initializing
					http::lib::ServiceResponse r;
                    when (this->servo_io.assertion_com_lib.grabPtrForCom_Sys_Lib()->value()!=NULL) execute ({this->sys_net_com_lib->http.get()->fetch_init_data(com::sys::lib::sysThrottleBalance::full);}, __end_until_(this->sys_net_com_lib->lib_internals->get()->isFinised!=false))>>r;
					return r->IsSuccessful()?this->current_thread->task.push_back_and_succeed(true):this->current_thread->task.push_back_and_fail(true);
                };
            }
        }
    }
}